import { Router } from 'express';
import { templateGet } from '../controller/drawNonSecureController';
import { corsAllowResponseSetter } from '../controller/drawCorsController';

export const drawNonSecureRouter = Router();

drawNonSecureRouter.use(corsAllowResponseSetter);

drawNonSecureRouter.get('/templates/:qname', templateGet);
