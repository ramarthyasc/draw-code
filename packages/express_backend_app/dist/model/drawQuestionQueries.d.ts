import type { Difficulty, IQuestionDetail, ILanguageTemplates, IQuestionMeta } from "../controller/drawQuestionsAndTemplatesController";
export declare function getPrevNextCurrentQuestionsQuery(qname: string): Promise<any[]>;
export declare function getQuestionsQuery(offset: number, limit: number): Promise<any[]>;
export declare function getQuestionDetail(qname: string): Promise<any>;
export declare function updateQuestion(changedDetail: IQuestionDetail, changedName: string, changedDifficulty: Difficulty, qname: string): Promise<any>;
export declare function createQuestion(newQDetail: IQuestionDetail, newQName: string, newQDifficulty: Difficulty): Promise<any>;
export declare function deleteLastQuestionQuery(): Promise<any>;
export declare function getQTemplate(qname: string): Promise<any>;
export declare function updateQTemplate(changedQmeta: IQuestionMeta, changedLangtemplates: ILanguageTemplates, qname: string): Promise<any>;
export declare function createQTemplate(newQmeta: IQuestionMeta, newLangtemplates: ILanguageTemplates, newQname: string): Promise<any>;
//# sourceMappingURL=drawQuestionQueries.d.ts.map