import type { NextFunction, Request, Response } from "express"
import type { Language } from "../service/types/question";
import {
    getQuestionsQuery,
    getQuestionDetail,
    updateQuestion,
    getQTemplate,
    updateQTemplate,
    createQuestion,
    createQTemplate,
    deleteLastQuestionQuery,
    getPrevNextCurrentQuestionsQuery,
} from "../model/drawQuestionQueries";
import { paginateQuestionsList } from "../service/drawQuestionService";

export type Difficulty = "easy" | "medium" | "hard";
export interface IQuestionsList {
    id: number,
    name: string,
    difficulty: Difficulty;
}
export interface IPaginate {
    page: number;
    limit: number;
}

export interface IExample {
    id: number;
    title: string;
    input: string;
    output: string;
    explanation: string;

}
export interface ITip {
    title: string;
    description: string;
}
export interface IQuestionDetail {
    id: number;
    name: string;
    title: string;
    difficulty: Difficulty;
    description: string;
    examples: IExample[];
    constraints: string[];
    tips: ITip[];
}


//NOTE: QUESTION 
export async function questionsDbGet(req: Request, res: Response, next: NextFunction) {
    // get all the questions (or Paginated)- only the id, name, difficulty from question_details table 

    const page = Number(req.query.page ?? "0");
    const limit = Number(req.query.limit ?? "10");
    // get a list of objects
    let questionsList: IQuestionsList[];
    try {
        questionsList = await paginateQuestionsList(page, limit, { getQuestionsQuery });
    } catch (err) {
        return next(err);
    }

    return res.json(questionsList);

}

export async function questionDetailDbGet(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname ?? "";

    let questionDetail: IQuestionDetail;
    if (typeof qname === "string") {
        try {
            const row = await getQuestionDetail(qname);
            questionDetail = row.detail;
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

    return res.json(questionDetail);
}

export async function questionDetailUserDbGet(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname ?? "";

    let questionDetails: IQuestionDetail;
    if (typeof qname === "string") {
        try {
            const row = await getQuestionDetail(qname);
            questionDetails = row.detail;

            const prevNextCurrentQuestionsArray: IQuestionsList[] = await getPrevNextCurrentQuestionsQuery(qname);

            let prevNextQuestionsArray: (IQuestionsList | null)[] = [];
            if (prevNextCurrentQuestionsArray[0]?.name === qname) {
                prevNextQuestionsArray.push(null);
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[1] as IQuestionsList);

            } else if (!prevNextCurrentQuestionsArray[2]) {
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[0] as IQuestionsList);
                prevNextQuestionsArray.push(null);

            } else if (prevNextCurrentQuestionsArray.length === 3) {
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[0] as IQuestionsList);
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[2] as IQuestionsList);
            }

            const qDetailsQNextPrev = { questionDetails, prevNextQuestionsArray }

            return res.json(qDetailsQNextPrev);



        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

export async function questionDbPut(req: Request, res: Response, next: NextFunction) {

    // current question name 
    const qname = req.params.qname ?? "";

    // Changed question name, difficulty, detail (Detail is the one updated. I get name & diff - derived)
    const changedDetail: IQuestionDetail = req.body;
    const changedDifficulty = changedDetail.difficulty;
    const changedName = changedDetail.name;

    let questionDetail: IQuestionDetail;
    if (typeof qname === "string") {
        try {
            const row = await updateQuestion(changedDetail, changedName, changedDifficulty, qname);
            questionDetail = row.detail;
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

    return res.json(questionDetail);
}



export async function questionDbPost(req: Request, res: Response, next: NextFunction) {
    const newQDetail: IQuestionDetail = req.body;

    // derived 
    const newQName = newQDetail.name;
    const newQDifficulty = newQDetail.difficulty;

    try {
        const row = await createQuestion(newQDetail, newQName, newQDifficulty);
        const questionDetail: IQuestionDetail = row.detail;
        return res.json(questionDetail);
    } catch (err) {
        return next(err);
    }
}

// Deletes the question_template row related to the question_detail row - as CASCADE DELETE is given
export async function questionDbDelete(req: Request, res: Response, next: NextFunction) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    let questionsList: IQuestionsList[];
    try {

        const row = await deleteLastQuestionQuery();

        if (!row) {
            // row undefined - ie; No rows to delete
            return res.json([]);
        }

        questionsList = await paginateQuestionsList(page, limit, { getQuestionsQuery });

        return res.json(questionsList);
    } catch (err) {
        return next(err);
    }

}




//NOTE: QUESTION TEMPLATE

export interface ILanguageTemplates {
    js: string;
    c: string;
}

type CaseAndOutput = {
    case: any,
    output: any
}

export interface IQuestionMeta {
    method: string,
    caseAndOutput: CaseAndOutput[],
}
export interface IQTemplatePackage {
    id: string;
    qname: string;
    qmeta: IQuestionMeta;
    langtemplates: ILanguageTemplates;
}

const newQTemplate: IQTemplatePackage = {
    id: "default",
    qname: "changetotherealqname",
    qmeta: {
        method: "<methodName>",
        caseAndOutput: [
            {
                case: "do you want to play a game ?",
                output: false
            },
            {
                case: "is it a good game ?",
                output: true
            }
        ]
    },
    langtemplates: {
        js: `class Solution {

    /**
    * @param {<paramType>} <paramName>
    * @return {<returnType>}
    */
    <methodName>(<paramName>) {

    }
}`,
        c: `int <methodName>(<paramType> <paramName>) {
}

           C Coming Soon ...
`
    },
}

function isLanguage(value: string | undefined): value is Language {
    return value === "js" || value === "c";
}

export async function qTemplateUserDbGet(req: Request, res: Response, next: NextFunction) {
    const { language } = req.query;
    const qname = req.params.qname ?? "";

    if (typeof language !== "string") {
        return res.status(400).send("Invalid Query !!");
    }
    if (!isLanguage(language)) {
        return res.status(404).send(`Invalid language: ${language} !!`);
    }

    // Get QTemplate of specific language
    if (typeof qname === "string") {
        try {
            const qtemplate: IQTemplatePackage = await getQTemplate(qname);
            if (!qtemplate) {
                // We didn't add a template for that question from the admin. So we will get rows[0] as undefined.
                // So we need to send a good response. With "Coming soon" message. So that in front end there won't happen 
                // a bug when navigating
                return res.status(200).send("admin-add-template");
            }
            const qlangtemplate: string = qtemplate.langtemplates[language];

            return res.send(qlangtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

export async function qTemplateDbGet(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname ?? "";

    // Get QTemplate of all languages
    if (typeof qname === "string") {
        try {
            const qtemplate: IQTemplatePackage = await getQTemplate(qname);
            if (!qtemplate) {
                newQTemplate.qname = qname;
                return res.json(newQTemplate); // send the Default Templatepackage so that 
                // frontend knows that there is no entry in db
            }
            return res.json(qtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

export async function qTemplateDbPut(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname ?? "";

    const changedQmeta: IQuestionMeta = req.body.qmeta;
    const changedLangtemplates: ILanguageTemplates = req.body.langtemplates;

    if (typeof qname === "string") {
        try {
            const qtemplate: IQTemplatePackage = await updateQTemplate(changedQmeta, changedLangtemplates, qname);
            return res.json(qtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

export async function qTemplateDbPost(req: Request, res: Response, next: NextFunction) {
    const newQname = req.params.qname ?? "";

    const newQmeta: IQuestionMeta = req.body.qmeta;
    const newLangtemplates: ILanguageTemplates = req.body.langtemplates;

    if (typeof newQname === "string") {
        try {
            const qtemplate: IQTemplatePackage = await createQTemplate(newQmeta, newLangtemplates, newQname);
            return res.json(qtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

