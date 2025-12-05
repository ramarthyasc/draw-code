import { Router } from 'express';
import { jwtAuth} from '../controller/drawAuthMiddleware';
import { submitPost } from '../controller/drawCompilerController.js';
import { corsAllowResponseSetter } from '../controller/drawCorsController.js';


export const secureRouter: Router = Router();

secureRouter.use(corsAllowResponseSetter)
secureRouter.use(jwtAuth);

secureRouter.post("/draw-submit", corsAllowResponseSetter, submitPost);
