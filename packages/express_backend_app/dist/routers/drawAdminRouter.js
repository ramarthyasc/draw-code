"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawAdminRouter = void 0;
const express_1 = require("express");
const drawQuestionsAndTemplatesController_1 = require("../controller/drawQuestionsAndTemplatesController");
const drawAdminAuthMiddleware_1 = require("../controller/drawAdminAuthMiddleware");
exports.drawAdminRouter = (0, express_1.Router)();
// give role to the jwt when logging in
exports.drawAdminRouter.use(drawAdminAuthMiddleware_1.jwtAuthAdmin);
// DON"T NEED DELETE - as  i can update any question i need instead
///QUESTION_DETAIL TABLE
// get qlist (containing id, name, difficutly) - DONE
exports.drawAdminRouter.get('/questions', drawQuestionsAndTemplatesController_1.questionsDbGet);
// get qdetail, update question (detail, (name, difficulty)) - DONE
exports.drawAdminRouter.route('/questions/:qname')
    .get(drawQuestionsAndTemplatesController_1.questionDetailDbGet)
    .put(drawQuestionsAndTemplatesController_1.questionDbPut);
exports.drawAdminRouter.post('/new-question', drawQuestionsAndTemplatesController_1.questionDbPost); // req has qdetail. question create ie; post (detail, (name, difficulty))
///QUESTION_TEMPLATE TABLE
// get qtemplate (qname, qmeta, langtemplates), update qtemplate(qmeta & langtemplates update)
exports.drawAdminRouter.route('/template/:qname')
    .get(drawQuestionsAndTemplatesController_1.qTemplateDbGet)
    .put(drawQuestionsAndTemplatesController_1.qTemplateDbPut);
exports.drawAdminRouter.post('/new-template/:qname', drawQuestionsAndTemplatesController_1.qTemplateDbPost); // template create ie; post (qmeta & langtemplates)
// DELETE qname - which cascades and deletes from the child question_templates table
exports.drawAdminRouter.delete('/delete-question', drawQuestionsAndTemplatesController_1.questionDbDelete);
//# sourceMappingURL=drawAdminRouter.js.map