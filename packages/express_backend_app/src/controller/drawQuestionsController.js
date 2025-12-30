const { questionsList, questionDetailsList } = require("../model/drawQuestionsInMemory.js");

exports.questionsGet = (req, res, next) => {

    console.log("HELLOOO BOIIII")
    console.log(JSON.stringify(req.params))

    const params = req.params;

    if (Object.keys(params).length === 0) {
        // send the questions names list only
        return res.json(questionsList);
    } else {
        // send the question metadata
        const questionDetails = questionDetailsList[params.question];
        if (!questionDetails) {
            next(new Error("Question not found"));
        }

        return res.json(questionDetails);

    }

}
