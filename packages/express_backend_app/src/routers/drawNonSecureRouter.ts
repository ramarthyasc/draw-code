import { Router } from 'express';
import { templateGet } from '../controller/drawNonSecureController';

export const nonSecureRouter = Router();

nonSecureRouter.get('/templates/:qname', templateGet);
