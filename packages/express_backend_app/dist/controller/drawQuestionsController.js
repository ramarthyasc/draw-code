"use strict";
const { questionsList, questionDetailsList } = require("../model/drawQuestionsInMemory.js");
exports.questionsGet = (req, res, next) => {
    const params = req.params;
    if (Object.keys(params).length === 0) {
        // send the questions names list only
        return res.json(questionsList);
    }
    else {
        // send the question metadata
        const questionDetails = questionDetailsList[params.question];
        if (!questionDetails) {
            next(new Error("Question not found"));
        }
        // constructing prevNextQuestionsArray 
        const prevQuestion = questionsList[questionDetails.id - 1];
        const nextQuestion = questionsList[questionDetails.id + 1];
        const prevNextQuestionsArray = [];
        prevQuestion ? prevNextQuestionsArray.push(prevQuestion) : prevNextQuestionsArray.push(null);
        nextQuestion ? prevNextQuestionsArray.push(nextQuestion) : prevNextQuestionsArray.push(null);
        // construction end
        const qDetailsQNextPrev = { questionDetails, prevNextQuestionsArray };
        return res.json(qDetailsQNextPrev);
    }
};
//# sourceMappingURL=drawQuestionsController.js.map