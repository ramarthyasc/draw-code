import { NextFunction, Request, Response } from "express"
import {
    getQuestionsQuery,
    getQuestionDetail,
    updateQuestion,
    getQTemplate,
    updateQTemplate,
    createQuestion,
    createQTemplate,
} from "../model/drawQuestionQueries";
import { paginateQuestionsList } from "../service/drawQuestionService";

export type Difficulty = "easy" | "medium" | "hard";
export interface QuestionsList {
    id: number,
    name: string,
    difficulty: Difficulty;
}
export interface Paginate {
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

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    // get a list of objects
    let questionsList: QuestionsList[];
    try {
        questionsList = await paginateQuestionsList(page, limit, { getQuestionsQuery });
    } catch (err) {
        return next(err);
    }

    return res.json(questionsList);

}

export async function questionDetailDbGet(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname;

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

export async function questionDbPut(req: Request, res: Response, next: NextFunction) {

    // current question name 
    const qname = req.params.qname;

    // Changed question name, difficulty, detail (Detail is the one updated. I get name & diff - derived)
    const changedDetail: IQuestionDetail = req.body.qdetail;
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
    const newQDetail: IQuestionDetail = req.body.detail;

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




//NOTE: QUESTION TEMPLATE

export interface LanguageTemplates {
    js: string;
    c: string;
}

type CaseAndOutput = {
    case: any,
    output: any
}

export interface QuestionMeta {
    method: string,
    caseAndOutput: CaseAndOutput[],
}
export interface QTemplatePackage {
    qname: string;
    qmeta: QuestionMeta;
    langtemplates: LanguageTemplates;
}

export async function qTemplateDbGet(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname;

    // Get QTemplate of all languages
    if (typeof qname === "string") {
        try {
            const qtemplate: QTemplatePackage = await getQTemplate(qname);
            return res.json(qtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

export async function qTemplateDbPut(req: Request, res: Response, next: NextFunction) {
    const qname = req.params.qname;

    const changedQmeta: QuestionMeta = req.body.qmeta;
    const changedLangtemplates: LanguageTemplates = req.body.langtemplates;

    if (typeof qname === "string") {
        try {
            const qtemplate: QTemplatePackage = await updateQTemplate(changedQmeta, changedLangtemplates, qname);
            return res.json(qtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}

export async function qTemplateDbPost(req: Request, res: Response, next: NextFunction) {
    const newQname = req.params.qname;

    const newQmeta: QuestionMeta = req.body.qmeta;
    const newLangtemplates: LanguageTemplates = req.body.langtemplates;

    if (typeof newQname === "string") {
        try {
            const qtemplate: QTemplatePackage = await createQTemplate(newQmeta, newLangtemplates, newQname);
            return res.json(qtemplate);
        } catch (err) {
            return next(err);
        }
    } else {
        return res.status(400).send("Route parameter value undefined");
    }

}
