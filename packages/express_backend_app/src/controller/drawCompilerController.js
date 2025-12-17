const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');
const { executeCodeContainer } = require('../service/drawExecutionService.js');
const { generateCodeFile } = require('../service/drawFileService.js');


exports.submitPost = (req, res) => {
  // take the data in
  const codeLanguage = req.body.language;
  const codeData = req.body.code;
    const FILENAME = "main";
  console.log(codeData);
  // test cases write for that question ; ie; the arguments that we will be giving to the function

  // create a separate container for solving the questions so that even if the answer is malignant, then it wouldn't affect the server application
  // First, without separate container - running in cmd

  //// create file path & folder
  const codeFolderPath = path.join(__dirname, `../model/sandbox/${codeLanguage}`);
  fs.mkdirSync(codeFolderPath, { recursive: true });
  //// Store the codefile inside that path
  const codeFilePath = generateCodeFile(fs, path, FILENAME, codeFolderPath, codeData, codeLanguage);

  //// execute the file 
executeCodeContainer(spawn, path, codeLanguage)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.log("Logging docker compose error: ", error);
    })
    .finally(() => {
      console.log("Child process' Promise settled");
    })

  //then send the answer cases in a json file to the client

    // delete the user code file
    fs.rmSync(codeFilePath);

  //Side features
  //Give sound to the system - while typing
} 
