exports.generateCodeFile = (fs, path, fileName, codeFolderPath, codeData, codeLanguage) => {

  const codeFilePath = path.join(codeFolderPath, `${fileName}.${codeLanguage}`);
  fs.writeFileSync(codeFilePath, codeData);
  return codeFilePath;

}
