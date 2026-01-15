"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsDbGet = questionsDbGet;
exports.questionDetailDbGet = questionDetailDbGet;
exports.questionDetailUserDbGet = questionDetailUserDbGet;
exports.questionDbPut = questionDbPut;
exports.questionDbPost = questionDbPost;
exports.questionDbDelete = questionDbDelete;
exports.qTemplateUserDbGet = qTemplateUserDbGet;
exports.qTemplateDbGet = qTemplateDbGet;
exports.qTemplateDbPut = qTemplateDbPut;
exports.qTemplateDbPost = qTemplateDbPost;
const drawQuestionQueries_1 = require("../model/drawQuestionQueries");
const drawQuestionService_1 = require("../service/drawQuestionService");
//NOTE: QUESTION 
async function questionsDbGet(req, res, next) {
    // get all the questions (or Paginated)- only the id, name, difficulty from question_details table 
    const page = Number(req.query.page ?? "0");
    const limit = Number(req.query.limit ?? "10");
    // get a list of objects
    let questionsList;
    try {
        questionsList = await (0, drawQuestionService_1.paginateQuestionsList)(page, limit, { getQuestionsQuery: drawQuestionQueries_1.getQuestionsQuery });
    }
    catch (err) {
        return next(err);
    }
    return res.json(questionsList);
}
async function questionDetailDbGet(req, res, next) {
    const qname = req.params.qname ?? "";
    let questionDetail;
    if (typeof qname === "string") {
        try {
            const row = await (0, drawQuestionQueries_1.getQuestionDetail)(qname);
            questionDetail = row.detail;
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
    return res.json(questionDetail);
}
async function questionDetailUserDbGet(req, res, next) {
    const qname = req.params.qname ?? "";
    let questionDetails;
    if (typeof qname === "string") {
        try {
            const row = await (0, drawQuestionQueries_1.getQuestionDetail)(qname);
            questionDetails = row.detail;
            const prevNextCurrentQuestionsArray = await (0, drawQuestionQueries_1.getPrevNextCurrentQuestionsQuery)(qname);
            let prevNextQuestionsArray = [];
            if (prevNextCurrentQuestionsArray[0]?.name === qname) {
                prevNextQuestionsArray.push(null);
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[1]);
            }
            else if (!prevNextCurrentQuestionsArray[2]) {
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[0]);
                prevNextQuestionsArray.push(null);
            }
            else if (prevNextCurrentQuestionsArray.length === 3) {
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[0]);
                prevNextQuestionsArray.push(prevNextCurrentQuestionsArray[2]);
            }
            const qDetailsQNextPrev = { questionDetails, prevNextQuestionsArray };
            return res.json(qDetailsQNextPrev);
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
}
async function questionDbPut(req, res, next) {
    // current question name 
    const qname = req.params.qname ?? "";
    // Changed question name, difficulty, detail (Detail is the one updated. I get name & diff - derived)
    const changedDetail = req.body;
    const changedDifficulty = changedDetail.difficulty;
    const changedName = changedDetail.name;
    let questionDetail;
    if (typeof qname === "string") {
        try {
            const row = await (0, drawQuestionQueries_1.updateQuestion)(changedDetail, changedName, changedDifficulty, qname);
            questionDetail = row.detail;
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
    return res.json(questionDetail);
}
async function questionDbPost(req, res, next) {
    const newQDetail = req.body;
    // derived 
    const newQName = newQDetail.name;
    const newQDifficulty = newQDetail.difficulty;
    try {
        const row = await (0, drawQuestionQueries_1.createQuestion)(newQDetail, newQName, newQDifficulty);
        const questionDetail = row.detail;
        return res.json(questionDetail);
    }
    catch (err) {
        return next(err);
    }
}
// Deletes the question_template row related to the question_detail row - as CASCADE DELETE is given
async function questionDbDelete(req, res, next) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    let questionsList;
    try {
        const row = await (0, drawQuestionQueries_1.deleteLastQuestionQuery)();
        if (!row) {
            // row undefined - ie; No rows to delete
            return res.json([]);
        }
        questionsList = await (0, drawQuestionService_1.paginateQuestionsList)(page, limit, { getQuestionsQuery: drawQuestionQueries_1.getQuestionsQuery });
        return res.json(questionsList);
    }
    catch (err) {
        return next(err);
    }
}
const newQTemplate = {
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
};
function isLanguage(value) {
    return value === "js" || value === "c";
}
async function qTemplateUserDbGet(req, res, next) {
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
            const qtemplate = await (0, drawQuestionQueries_1.getQTemplate)(qname);
            if (!qtemplate) {
                // We didn't add a template for that question from the admin. So we will get rows[0] as undefined.
                // So we need to send a good response. With "Coming soon" message. So that in front end there won't happen 
                // a bug when navigating
                return res.status(200).send("admin-add-template");
            }
            const qlangtemplate = qtemplate.langtemplates[language];
            return res.send(qlangtemplate);
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
}
async function qTemplateDbGet(req, res, next) {
    const qname = req.params.qname ?? "";
    // Get QTemplate of all languages
    if (typeof qname === "string") {
        try {
            const qtemplate = await (0, drawQuestionQueries_1.getQTemplate)(qname);
            if (!qtemplate) {
                newQTemplate.qname = qname;
                return res.json(newQTemplate); // send the Default Templatepackage so that 
                // frontend knows that there is no entry in db
            }
            return res.json(qtemplate);
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
}
async function qTemplateDbPut(req, res, next) {
    const qname = req.params.qname ?? "";
    const changedQmeta = req.body.qmeta;
    const changedLangtemplates = req.body.langtemplates;
    if (typeof qname === "string") {
        try {
            const qtemplate = await (0, drawQuestionQueries_1.updateQTemplate)(changedQmeta, changedLangtemplates, qname);
            return res.json(qtemplate);
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
}
async function qTemplateDbPost(req, res, next) {
    const newQname = req.params.qname ?? "";
    const newQmeta = req.body.qmeta;
    const newLangtemplates = req.body.langtemplates;
    if (typeof newQname === "string") {
        try {
            const qtemplate = await (0, drawQuestionQueries_1.createQTemplate)(newQmeta, newLangtemplates, newQname);
            return res.json(qtemplate);
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        return res.status(400).send("Route parameter value undefined");
    }
}
//# sourceMappingURL=drawQuestionsAndTemplatesController.js.map