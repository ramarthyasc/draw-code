import { Router } from 'express';
import { jwtAuth} from '../controller/drawAuthMiddleware';
import { submitPost } from '../controller/drawCompilerController.js';
import { corsAllowResponseSetter } from '../controller/drawCorsController.js';
import { refreshTokenJwtGen } from '../controller/drawAuthMiddleware';


export const secureRouter: Router = Router();

// auth middleware - refresh-auth for generating RT & JWT - For SECURITY
secureRouter.use('/refresh-auth', refreshTokenJwtGen)

secureRouter.use(corsAllowResponseSetter)
secureRouter.use(jwtAuth);

secureRouter.post("/draw-submit/:qname", submitPost);
