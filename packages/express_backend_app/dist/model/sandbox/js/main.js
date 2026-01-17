"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Solution {
    /**
    * @param {string} s
    * @return {boolean}
    */
    isPalindrome(s) {
        let l = 0;
        let r = s.length - 1;
        let string = s.toLowerCase();
        function charAnalyser(char) {
            if (("a".charCodeAt(0) <= char.charCodeAt(0) &&
                char.charCodeAt(0) <= "z".charCodeAt(0)) || ("0".charCodeAt(0) <= char.charCodeAt(0) &&
                char.charCodeAt(0) <= "9".charCodeAt(0))) {
                return true;
            }
            else {
                return false;
            }
        }
        while (l < r) {
            if (!charAnalyser(string.at(l)) || !charAnalyser(string.at(r))) {
                if (!charAnalyser(string.at(l))) {
                    l++;
                }
                if (!charAnalyser(string.at(r))) {
                    r--;
                }
                continue;
            }
            if (string.at(l) !== string.at(r)) {
                console.log("hello");
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
const solution = new Solution();
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
                if (isSame === false) {
                    return;
                }
            }
        }
        else if (Object.prototype.toString.call(known) === "[object Object]") {
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
                if (isSame === false) {
                    return;
                }
            }
        }
        else {
            // BASE CASE
            // From the Array of Array of Array... Arrays, we get the string/number/boolean literals as known & unknown
            if (known !== unknown) {
                isSame = false;
                return;
            }
        }
    }
}
function stringify(input) {
    if (typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        Object.prototype.toString.call(input) === "[object Null]") {
        return `${input}`;
    }
    else if (typeof input === "string") {
        return `"${input}"`;
    }
    else if (Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]") {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}
function stringLogger(input) {
    if (typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        typeof input === "string" ||
        Object.prototype.toString.call(input) === "[object Null]") {
        return `${input}`;
    }
    else if (Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]") {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}
let res0;
try {
    res0 = solution.isPalindrome("Was it a car or a cat I saw?");
}
catch (err) {
    // to be written to FD2
    throw err;
}
// try {
//     comparer(true, res0) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }
// Make a JSON format
console.log(`{ "id": 0,` +
    `"pass": ${comparer(true, res0)},` +
    `"input": "Was it a car or a cat I saw?",` +
    `"userOutput": "${stringLogger(res0)}",` +
    `"expOutput": "true" }`);
// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
console.log("_&&_@849"); //problem case separator =  _&&_@849\n
let res1;
try {
    res1 = solution.isPalindrome("tab a cat");
}
catch (err) {
    // to be written to FD2
    throw err;
}
// try {
//     comparer(false, res1) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }
// Make a JSON format
console.log(`{ "id": 1,` +
    `"pass": ${comparer(false, res1)},` +
    `"input": "tab a cat",` +
    `"userOutput": "${stringLogger(res1)}",` +
    `"expOutput": "false" }`);
// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
console.log("_&&_@849"); //problem case separator =  _&&_@849\n
//# sourceMappingURL=main.js.map