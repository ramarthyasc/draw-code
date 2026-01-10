import type { IQuestionsList } from "../controller/drawQuestionsAndTemplatesController";

interface IGetQuestion {
    getQuestionsQuery(limit: number, offset: number): Promise<IQuestionsList[]>;
}

export async function paginateQuestionsList(page: number, limit: number, get: IGetQuestion) {

    // page number is 0 base indexed
    //
    const offset = page * limit;
    const rows = await get.getQuestionsQuery(offset, limit);
    return rows;

}

