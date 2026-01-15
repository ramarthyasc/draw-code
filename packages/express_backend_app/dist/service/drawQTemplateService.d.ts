import type { Language, QuestionName } from '../controller/drawNonSecureController';
import type { QuestionMethodName } from './types/question';
interface IQuestionTemplate {
    js: string;
    c: string;
}
type QuestionTemplateList = {
    [key in QuestionName]: IQuestionTemplate;
};
type CaseAndOutput = {
    case: any;
    output: any;
};
export type QuestionMap = {
    [K in QuestionName]: {
        method: QuestionMethodName;
        parameter: string;
        caseAndOutput: CaseAndOutput[];
    };
};
export declare const questionMap: QuestionMap;
export declare const qtemplate: QuestionTemplateList;
export declare function generateTemplate(qname: QuestionName, language: Language): string;
export {};
//# sourceMappingURL=drawQTemplateService.d.ts.map