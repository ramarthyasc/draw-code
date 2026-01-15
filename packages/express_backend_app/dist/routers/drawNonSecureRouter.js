"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawNonSecureRouter = void 0;
const express_1 = require("express");
const drawQuestionsAndTemplatesController_1 = require("../controller/drawQuestionsAndTemplatesController");
exports.drawNonSecureRouter = (0, express_1.Router)();
// drawNonSecureRouter.use(corsAllowResponseSetter);
exports.drawNonSecureRouter.get('/template/:qname', drawQuestionsAndTemplatesController_1.qTemplateUserDbGet);
exports.drawNonSecureRouter.get('/questions', drawQuestionsAndTemplatesController_1.questionsDbGet);
exports.drawNonSecureRouter.get('/questions/:qname', drawQuestionsAndTemplatesController_1.questionDetailUserDbGet);
//# sourceMappingURL=drawNonSecureRouter.js.map