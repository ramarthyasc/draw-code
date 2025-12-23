import type { ILangTemplate, Language } from '../controller/drawNonSecureController';

export function generateTemplate(language: Language): ILangTemplate {

    let langTemplate: ILangTemplate ;
    if (language === "js") {

        langTemplate = {
            language: language,
            text: ` class Solution {\
        }`
        }
    } else if (language === "c") {

        langTemplate = {
            language: language,
            text: ` function solution{\
        }`
        }
        
    } else {
        langTemplate = {
            language: null,
            text: ""
        }
    }
        return langTemplate;

}
