import type { IQuestionsList } from "../controller/drawQuestionsAndTemplatesController";
interface IGetQuestion {
    getQuestionsQuery(limit: number, offset: number): Promise<IQuestionsList[]>;
}
export declare function paginateQuestionsList(page: number, limit: number, get: IGetQuestion): Promise<IQuestionsList[]>;
export {};
//# sourceMappingURL=drawQuestionService.d.ts.map