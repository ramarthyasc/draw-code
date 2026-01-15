"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawSecureRouter = void 0;
const express_1 = require("express");
const drawAuthMiddleware_1 = require("../controller/drawAuthMiddleware");
const drawCompilerController_js_1 = require("../controller/drawCompilerController.js");
const drawAuthMiddleware_2 = require("../controller/drawAuthMiddleware");
exports.drawSecureRouter = (0, express_1.Router)();
// drawSecureRouter.use(corsAllowResponseSetter)
// auth middleware - refresh-auth for generating RT & JWT - For SECURITY
exports.drawSecureRouter.use('/refresh-auth', drawAuthMiddleware_2.refreshTokenJwtGen);
exports.drawSecureRouter.use(drawAuthMiddleware_1.jwtAuth);
exports.drawSecureRouter.post("/draw-submit/:qname", drawCompilerController_js_1.submitPost);
//# sourceMappingURL=drawSecureRouter.js.map