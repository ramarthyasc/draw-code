import type { Language, QuestionName } from '../controller/drawNonSecureController';
import type { QuestionMethodName } from './types/question';

export interface QuestionTemplate {
    js: string;
    c: string;
}

export type QuestionTemplateList = {
    [key in QuestionName]: QuestionTemplate
}
type CaseAndOutput = {
    case: any,
    output: any
}

export type QuestionMap = {
    [K in QuestionName]: {
        method: QuestionMethodName,
        parameter: string,
        caseAndOutput: CaseAndOutput[],

    }
}

//runtime
export const questionMap: QuestionMap = {
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
}

export const qtemplate: QuestionTemplateList = {
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

}`
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
        c: `Coming soon...`

    }
}

export function generateTemplate(qname: QuestionName, language: Language): string {

    const template: QuestionTemplate = qtemplate[qname];

    return template[language];


}

