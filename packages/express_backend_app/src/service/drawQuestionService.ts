import type { QuestionsList } from "../controller/drawAdminController";

interface Funcs {
    getQuestionsQuery(limit: number, offset: number): Promise<QuestionsList[]>;
}

export async function paginateQuestionsList(page: number, limit: number, funcs: Funcs) {

    // page number is 0 base indexed
    //
    const offset = page * limit;
    const rows = await funcs.getQuestionsQuery(offset, limit);
    return rows;

}

