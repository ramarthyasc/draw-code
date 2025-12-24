import type { Request, Response, NextFunction } from 'express';
import { generateTemplate } from '../service/drawLangTemplateService';

export type Language = "js" | "c" ;
export type QuestionName = "trapping-rain-water" | "is-palindrome" | "three-integer-sum";
// for runtime validation
export const questionName = ["trapping-rain-water", "is-palindrome", "three-integer-sum"];
// for runtime validation
export function isLanguage(value: string | undefined): value is Language {
    return value === "js" || value === "c";
}
export function isQuestionName(value: string | undefined): value is QuestionName {
    return value ? questionName.includes(value) : false ;
}
export function templateGet(req: Request, res: Response, next: NextFunction) {
    const { language } = req.query;
    const qname = req.params.qname;

    // question typeguard
    if (!isQuestionName(qname)) {
        return res.status(404).send(`Invalid question name: ${qname} !!`);
    } 

    //type guard (runtime & compile time)
    if (typeof language !== "string") {
        return res.status(400).send("Invalid Query !!");
    }
    if (!isLanguage(language)) {
        return res.status(404).send(`Invalid language: ${language} !!`);
    }
    
    // after type guard, it's implied that qname is QuestionName
    // after type guard, it's implied that language is Language

    const qtemplate:string = generateTemplate(qname, language);

    console.log(qtemplate);
    return res.send(qtemplate);
}
