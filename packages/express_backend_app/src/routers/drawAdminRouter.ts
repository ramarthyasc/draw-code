import { Router } from "express";
import {
    questionsDbGet,
    questionDetailDbGet,
    questionDbPut,
    qTemplateDbGet,
    qTemplateDbPut,
    questionDbPost,
    qTemplateDbPost,
    questionDbDelete,
} from "../controller/drawQuestionsAndTemplatesController";
import { jwtAuthAdmin } from "../controller/drawAdminAuthMiddleware";

export const drawAdminRouter = Router();

// give role to the jwt when logging in
drawAdminRouter.use(jwtAuthAdmin);

// DON"T NEED DELETE - as  i can update any question i need instead

///QUESTION_DETAIL TABLE
// get qlist (containing id, name, difficutly) - DONE
drawAdminRouter.get('/questions', questionsDbGet);
// get qdetail, update question (detail, (name, difficulty)) - DONE
drawAdminRouter.route('/questions/:qname')
    .get(questionDetailDbGet)
    .put(questionDbPut)
drawAdminRouter.post('/new-question', questionDbPost) // req has qdetail. question create ie; post (detail, (name, difficulty))

///QUESTION_TEMPLATE TABLE
// get qtemplate (qname, qmeta, langtemplates), update qtemplate(qmeta & langtemplates update)
drawAdminRouter.route('/template/:qname')
    .get(qTemplateDbGet)
    .put(qTemplateDbPut)
drawAdminRouter.post('/new-template/:qname', qTemplateDbPost) // template create ie; post (qmeta & langtemplates)


// DELETE qname - which cascades and deletes from the child question_templates table
drawAdminRouter.delete('/delete-question', questionDbDelete)
