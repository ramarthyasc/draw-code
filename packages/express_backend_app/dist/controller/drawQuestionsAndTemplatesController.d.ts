import type { NextFunction, Request, Response } from "express";
export type Difficulty = "easy" | "medium" | "hard";
export interface IQuestionsList {
    id: number;
    name: string;
    difficulty: Difficulty;
}
export interface IPaginate {
    page: number;
    limit: number;
}
export interface IExample {
    id: number;
    title: string;
    input: string;
    output: string;
    explanation: string;
}
export interface ITip {
    title: string;
    description: string;
}
export interface IQuestionDetail {
    id: number;
    name: string;
    title: string;
    difficulty: Difficulty;
    description: string;
    examples: IExample[];
    constraints: string[];
    tips: ITip[];
}
export declare function questionsDbGet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function questionDetailDbGet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function questionDetailUserDbGet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function questionDbPut(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function questionDbPost(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function questionDbDelete(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export interface ILanguageTemplates {
    js: string;
    c: string;
}
type CaseAndOutput = {
    case: any;
    output: any;
};
export interface IQuestionMeta {
    method: string;
    caseAndOutput: CaseAndOutput[];
}
export interface IQTemplatePackage {
    id: string;
    qname: string;
    qmeta: IQuestionMeta;
    langtemplates: ILanguageTemplates;
}
export declare function qTemplateUserDbGet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function qTemplateDbGet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function qTemplateDbPut(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function qTemplateDbPost(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=drawQuestionsAndTemplatesController.d.ts.map