"use strict";
const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');
const { executeCodeContainer } = require('../service/drawExecutionService');
const { generateExecutableCodeFile } = require('../service/drawExecutionCodegenService');
exports.submitPost = async (req, res, next) => {
    // take the data in
    const codeLanguage = req.body.language;
    const codeData = req.body.code;
    const FILENAME = "main";
    const { qname } = req.params;
    // test cases write for that question ; ie; the arguments that we will be giving to the function
    // create a separate container for solving the questions so that even if the answer is malignant, then it wouldn't affect the server application
    // First, without separate container - running in cmd
    //// create file path & folder
    const codeFolderPath = path.join(__dirname, `../model/sandbox/${codeLanguage}`);
    fs.mkdirSync(codeFolderPath, { recursive: true });
    // Transform the codedata, make it executable (logging / printing - to stdout the user result + problem solution)
    let codeFilePath;
    try {
        codeFilePath = await generateExecutableCodeFile(codeData, codeLanguage, qname, codeFolderPath, FILENAME, path, fs);
    }
    catch (err) {
        next(err);
    }
    //// execute the file 
    executeCodeContainer(spawn, path, codeLanguage)
        .then((value) => {
        if (typeof value === "string") {
            // for error stack
            res.status(400).send(value);
        }
        else {
            // for Result ie; Array of objects
            res.json(value);
        }
    })
        .catch((error) => {
        next(err);
    });
    //then send the answer cases in a json file to the client
    //Side features
    //Give sound to the system - while typing
};
//# sourceMappingURL=drawCompilerController.js.map