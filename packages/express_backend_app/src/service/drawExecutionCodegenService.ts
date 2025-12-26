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
                console.log("1")
                isSame = false;
                return;
            }
            if (known.length !== unknown.length) {
                console.log("2")
                isSame = false;
                return;
            }

            // If known is empty array
            if (known.length === 0 && known.length === unknown.length) {
                return;
            }

            for (let i = 0; i < known.length; i++) {
                console.log(known[i], unknown[i]);
                arrayOrObjectOrPrimitiveComparer(known[i], unknown[i]);
                if (isSame === false) { return; }
            }
        } else if (Object.prototype.toString.call(known) === "[object Object]") {
            if (Object.prototype.toString.call(unknown) !== "[object Object]") {
                console.log("3")
                isSame = false;
                return;
            }
            if (Object.entries(known).length !== Object.entries(unknown).length) {
                console.log("4")
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
                console.log(known, unknown);
                console.log("5");
                isSame = false;
                return;
            }
        }

    }
}

`
}

// create function which returns JSON stringified versions only when Arrays and strings are given. Otherwise, 
// return the argument value itself 
// Then put this function wherever template string's variable insertions are given

function jsExecuterText(testCaseNum: number, caseAndMethod: QuestionMap[QuestionName]) {
    return `

let res;
try {
     res = solution.${caseAndMethod.method}(${caseAndMethod.caseAndOutput[testCaseNum]?.case});
} catch(err) {
    // to be written to FD2
    throw err;
}

//res === ${caseAndMethod.caseAndOutput[testCaseNum]?.output} ? console.log("PASS") : console.log("FAIL")
try {
    comparer(${caseAndMethod.caseAndOutput[testCaseNum]?.output}, res) ? console.log("PASS") : console.log("FAIL");
} catch(err) {
    throw err;
}

    console.log(\`
Input: 
${caseAndMethod.caseAndOutput[testCaseNum]?.case}

Your output:
\${res}

Expected output:
${caseAndMethod.caseAndOutput[testCaseNum]?.output}

\`)

`
}

export function generateExecutableCodeFile(codeData: string,
    codeLanguage: Language, qname: QuestionName,
    codeFolderPath: string, filename: string, path: PathModule, fs: FileSystem) {

    if (codeLanguage === 'js') {
        // backticks take strings as WYSYG - which means if there are spaces before any string within the ``, then
        // they are taken as is.
        let transformedCode =
            `${codeData}

const solution = new Solution();
`

        switch (qname) {

            case "trapping-rain-water": {
                const caseAndMethod = questionMap['trapping-rain-water'];
                transformedCode += jsResultComparerText() + "\n\n First case" + jsExecuterText(0, caseAndMethod);

                break;
            }
            case "is-palindrome": {
                const caseAndMethod = questionMap['is-palindrome'];

                transformedCode += jsResultComparerText() + "\n\n First case" + jsExecuterText(0, caseAndMethod) +
                    "\n\n Second case" + jsExecuterText(1, caseAndMethod);
                break;
            }
            case "three-integer-sum": {
                const caseAndMethod = questionMap['three-integer-sum'];
                transformedCode += jsResultComparerText() + "\n\n First case" + jsExecuterText(0, caseAndMethod) +
                    "\n\n Second case" + jsExecuterText(1, caseAndMethod);

                break;
            }

        }
    }


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
