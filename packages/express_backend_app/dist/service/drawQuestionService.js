"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateQuestionsList = paginateQuestionsList;
async function paginateQuestionsList(page, limit, get) {
    // page number is 0 base indexed
    //
    const offset = page * limit;
    const rows = await get.getQuestionsQuery(offset, limit);
    return rows;
}
//# sourceMappingURL=drawQuestionService.js.map