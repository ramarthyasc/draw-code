"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionName = void 0;
exports.isLanguage = isLanguage;
exports.isQuestionName = isQuestionName;
exports.templateGet = templateGet;
const drawQTemplateService_1 = require("../service/drawQTemplateService");
// for runtime validation
exports.questionName = ["trapping-rain-water", "is-palindrome", "three-integer-sum"];
// for runtime validation
function isLanguage(value) {
    return value === "js" || value === "c";
}
function isQuestionName(value) {
    return value ? exports.questionName.includes(value) : false;
}
function templateGet(req, res, next) {
    const { language } = req.query;
    const qname = req.params.qname;
    // question typeguard
    if (!isQuestionName(qname)) {
        return res.status(404).send(`Invalid question name: ${qname} !!`);
    }
    //type guard (runtime & compile time)
    if (typeof language !== "string") {
        return res.status(400).send("Invalid Query !!");
    }
    if (!isLanguage(language)) {
        return res.status(404).send(`Invalid language: ${language} !!`);
    }
    // after type guard, it's implied that qname is QuestionName
    // after type guard, it's implied that language is Language
    const qtemplate = (0, drawQTemplateService_1.generateTemplate)(qname, language);
    return res.send(qtemplate);
}
//# sourceMappingURL=drawNonSecureController.js.map