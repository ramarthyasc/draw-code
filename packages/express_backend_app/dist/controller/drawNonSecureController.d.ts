import type { Request, Response, NextFunction } from 'express';
export type Language = "js" | "c";
export type QuestionName = "trapping-rain-water" | "is-palindrome" | "three-integer-sum";
export declare const questionName: string[];
export declare function isLanguage(value: string | undefined): value is Language;
export declare function isQuestionName(value: string | undefined): value is QuestionName;
export declare function templateGet(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
//# sourceMappingURL=drawNonSecureController.d.ts.map