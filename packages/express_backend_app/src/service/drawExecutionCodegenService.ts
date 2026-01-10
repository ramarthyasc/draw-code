import type { QuestionName, Language } from './types/question';
import type { PathModule, FileSystem } from './types/nodeTypes.ts';
import type { QuestionMap } from './drawQTemplateService';
import { questionMap } from './drawQTemplateService';

function jsResultComparerText() {
    return `

function comparer(k, u) {

    let isSame = true;
    arrayOrObjectOrPrimitiveComparer(k, u);

    return isSame;

    //Case's known output array = known, User's result array/don't know which data type = unknown
    function arrayOrObjectOrPrimitiveComparer(known, unknown) {
        if (Array.isArray(known)) {
            if (!Array.isArray(unknown)) {
                isSame = false;
                return;
            }
            if (known.length !== unknown.length) {
                isSame = false;
                return;
            }

            // If known is empty array
            if (known.length === 0 && known.length === unknown.length) {
                return;
            }

            for (let i = 0; i < known.length; i++) {
                arrayOrObjectOrPrimitiveComparer(known[i], unknown[i]);
                if (isSame === false) { return; }
            }
        } else if (Object.prototype.toString.call(known) === "[object Object]") {
            if (Object.prototype.toString.call(unknown) !== "[object Object]") {
                isSame = false;
                return;
            }
            if (Object.entries(known).length !== Object.entries(unknown).length) {
                isSame = false;
                return;
            }
            //converted to array - to be used by the recurser
            known = Object.entries(known);
            unknown = Object.entries(unknown);
            if (known.length === 0 && known.length === unknown.length) {
                return;
            }

            for (let i = 0; i < known.length; i++) {
                arrayOrObjectOrPrimitiveComparer(known[i], unknown[i]);
                if (isSame === false) { return; }
            }

        } else {
            // BASE CASE
            // From the Array of Array of Array... Arrays, we get the string/number/boolean literals as known & unknown
            if (known !== unknown) {
                isSame = false;
                return;
            }
        }

    }
}

`
}

// create function which returns JSON stringified versions only when Arrays and Objects are given. Otherwise, 
// return the argument value itself if not a string. If a string, append "" characters too
// Then put this function wherever template string's variable insertions are given or inside jsx
export function stringify(input: unknown) {
    if (typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return `${input}`;
    } else if (
        typeof input === "string"
    ) {
        return `"${input}"`;
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}

export function stringLogger(input: unknown) {
    if (typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        typeof input === "string" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return `${input}`;
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}

function stringifyText() {

    return `

function stringify(input) {
    if ( typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return \`\${input}\`;
    } else if (
        typeof input === "string" 
    ){
        return \`"\${input}"\`
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}

`
}
function stringLoggerText() {

    return `

function stringLogger(input) {
    if ( typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        typeof input === "string" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return \`\${input}\`;
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}


`
}

function jsExecuterText(resName: string, testCaseNum: number, caseAndMethod: QuestionMap[QuestionName]) {
    return `

let ${resName};
try {
     ${resName} = solution.${caseAndMethod.method}(${stringify(caseAndMethod.caseAndOutput[testCaseNum]?.case)});
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(${stringify(caseAndMethod.caseAndOutput[testCaseNum]?.output)}, ${resName}) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(\`{ "id": ${testCaseNum},\` + 
\`"pass": \${comparer(${stringify(caseAndMethod.caseAndOutput[testCaseNum]?.output)}, ${resName})},\` +
\`"input": "${stringLogger(caseAndMethod.caseAndOutput[testCaseNum]?.case)}",\` +
\`"userOutput": "\${stringLogger(${resName})}",\` + 
\`"expOutput": "${stringLogger(caseAndMethod.caseAndOutput[testCaseNum]?.output)}" }\`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\\n



`
}
///// USE WHEN DOING C CODE JUDGE
// function cExecuterText(resName: string, testCaseNum: number, caseAndMethod: QuestionMap[QuestionName]) {
// return `
//
//
// ${resName} = ${caseAndMethod.method}(${stringify(caseAndMethod.caseAndOutput[testCaseNum]?.case)});
//
// printf("Input: \\n"
//       "${stringify(caseAndMethod.caseAndOutput[testCaseNum]?.case)} \\n");
//
// printf("Your output: \\n"
//       "${resName} \\n")
//
// printf("Expected output: \\n"
//       "${stringify(caseAndMethod.caseAndOutput[testCaseNum]?.output)} \\n")
//
// `
// }

export function generateExecutableCodeFile(codeData: string,
    codeLanguage: Language, qname: QuestionName,
    codeFolderPath: string, fileName: string, path: PathModule, fs: FileSystem) {

    let transformedCode: string;
    if (codeLanguage === 'js') {
        // backticks take strings as WYSYG - which means if there are spaces before any string within the ``, then
        // they are taken as is.
        transformedCode =
            `

${codeData}

const solution = new Solution();


`



        switch (qname) {

            case "trapping-rain-water": {
                const caseAndMethod = questionMap['trapping-rain-water'];
                transformedCode += jsResultComparerText() + stringifyText() + stringLoggerText() +
                    "\n\n //First case" + jsExecuterText("res0", 0, caseAndMethod);

                break;
            }
            case "is-palindrome": {
                const caseAndMethod = questionMap['is-palindrome'];

                transformedCode += jsResultComparerText() + stringifyText() + stringLoggerText() +
                    "\n\n //First case" + jsExecuterText("res0", 0, caseAndMethod) +
                    "\n\n //Second case" + jsExecuterText("res1", 1, caseAndMethod);
                break;
            }
            case "three-integer-sum": {
                const caseAndMethod = questionMap['three-integer-sum'];
                transformedCode += jsResultComparerText() + stringifyText() + stringLoggerText() +
                    "\n\n //First case" + jsExecuterText("res0", 0, caseAndMethod) +
                    "\n\n //Second case" + jsExecuterText("res1", 1, caseAndMethod);

                break;
            }

        }
    } else if (codeLanguage === 'c') {
        // PASS right now 
        transformedCode =
            `

#include <stdio.h>

//remove \ from here to insert the Codedata:  \${codeData}

int main(void) {
    printf("Coming soon ...");
    return 0;
}

`
    } else {
        // caught using next(err) in the controller
        throw new Error("Unknown language");
    }

    const codeFilePath = path.join(codeFolderPath, `${fileName}.${codeLanguage}`);
    try {
        fs.writeFileSync(codeFilePath, transformedCode);
    } catch (err) {
        console.log(err);
        throw err;
    }

    return codeFilePath;

}


// exports.generateCodeFile = (fs, path, fileName, codeFolderPath, codeData, codeLanguage) => {
//
//     const codeFilePath = path.join(codeFolderPath, `${fileName}.${codeLanguage}`);
//     if (codeLanguage === "js") {
//         try {
//             fs.writeFileSync(codeFilePath, codeData);
//             // append export 
//             const data = "export const solution = new Solution();"
//             fs.appendFileSync(codeFilePath, data);
//
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//
//     } else if (codeLanguage === "c") {
//         fs.writeFileSync(codeFilePath, codeData);
//     }
//     return codeFilePath;
//
// }
