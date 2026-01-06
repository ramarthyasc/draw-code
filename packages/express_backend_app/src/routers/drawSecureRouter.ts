import { Router } from 'express';
import { jwtAuth} from '../controller/drawAuthMiddleware';
import { submitPost } from '../controller/drawCompilerController.js';
import { corsAllowResponseSetter } from '../controller/drawCorsController.js';
import { refreshTokenJwtGen } from '../controller/drawAuthMiddleware';


export const drawSecureRouter: Router = Router();

drawSecureRouter.use(corsAllowResponseSetter)

// auth middleware - refresh-auth for generating RT & JWT - For SECURITY
drawSecureRouter.use('/refresh-auth', refreshTokenJwtGen)

drawSecureRouter.use(jwtAuth);

drawSecureRouter.post("/draw-submit/:qname", submitPost);
