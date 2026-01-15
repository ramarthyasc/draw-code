"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qtemplate = exports.questionMap = void 0;
exports.generateTemplate = generateTemplate;
//runtime
exports.questionMap = {
    "trapping-rain-water": {
        method: "waterTrap",
        parameter: "height",
        caseAndOutput: [
            {
                case: [0, 2, 0, 3, 1, 0, 1, 3, 2, 1],
                output: 9
            }
        ]
    },
    "is-palindrome": {
        method: "isPalindrome",
        parameter: "s",
        caseAndOutput: [
            {
                case: "Was it a car or a cat I saw?",
                output: true
            },
            {
                case: "tab a cat",
                output: false
            }
        ]
    },
    "three-integer-sum": {
        method: "threeSum",
        parameter: "nums",
        caseAndOutput: [
            {
                case: [-1, 0, 1, 2, -1, -4],
                output: [[-1, -1, 2], [-1, 0, 1]]
            },
            {
                case: [0, 1, 1],
                output: []
            }
        ]
    },
};
exports.qtemplate = {
    "trapping-rain-water": {
        js: `class Solution {

    /**
    * @param {number[]} height
    * @return {number}
    */
    waterTrap(height) {

    }
}`,
        c: `int waterTrap(int *height) {
}

           C Coming Soon ...
`
    },
    "is-palindrome": {
        js: `class Solution {

    /**
    * @param {string} s
    * @return {boolean}
    */
    isPalindrome(s) {

    }
}`,
        c: `int isPalindrome(const char *s) {
}

           C Coming Soon ...
`
    },
    "three-integer-sum": {
        js: `class Solution {

    /**
    * @param {number[]} nums
    * @return {number[][]}
    */
    threeSum(nums) {

    }
}`,
        c: `C Coming soon...`
    }
};
function generateTemplate(qname, language) {
    const template = exports.qtemplate[qname];
    return template[language];
}
//# sourceMappingURL=drawQTemplateService.js.map