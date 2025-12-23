import type { Request, Response, NextFunction } from 'express';
import { generateTemplate } from '../service/drawLangTemplateService';

export type Language = "js" | "c" | null;
export interface ILangTemplate {
    language: Language;
    text: string;
}
export function templategetPost(req: Request, res: Response, next: NextFunction) {
    const language: Language = req.body.language;

    const langtemplate: ILangTemplate  = generateTemplate(language);

    return res.json(langtemplate);
}
