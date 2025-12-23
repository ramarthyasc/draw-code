import { Router } from 'express';
import { templategetPost } from '../controller/drawNonSecureController';

export const nonSecureRouter = Router();

nonSecureRouter.post('/templates', templategetPost);
