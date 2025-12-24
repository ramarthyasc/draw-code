import type { Language, QuestionName } from '../controller/drawNonSecureController';

export type QuestionTemplateList = {
    [key in QuestionName]: QuestionTemplate
}
export interface QuestionTemplate {
    js: string;
    c: string;
}

export const qtemplate: QuestionTemplateList = {
    "trapping-rain-water": {
        js: `class Solution {

    /**
    * @param {number[]} height
    * @return {number}
    */
    trapper(height) {

    }
}`,
        c: `int trapper(int *height) {

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
        js: 
            `class Solution {

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

