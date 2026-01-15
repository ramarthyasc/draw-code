import { Router } from 'express';
import { corsAllowResponseSetter } from '../controller/drawCorsController';
import { questionsDbGet, questionDetailUserDbGet, qTemplateUserDbGet } from '../controller/drawQuestionsAndTemplatesController';

export const drawNonSecureRouter = Router();

// drawNonSecureRouter.use(corsAllowResponseSetter);

drawNonSecureRouter.get('/template/:qname', qTemplateUserDbGet);

drawNonSecureRouter.get('/questions', questionsDbGet);

drawNonSecureRouter.get('/questions/:qname', questionDetailUserDbGet)
    
