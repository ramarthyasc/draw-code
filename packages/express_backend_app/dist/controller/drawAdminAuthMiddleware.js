"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthAdmin = void 0;
const drawJwtVerifierService_1 = require("../service/drawJwtVerifierService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// AUTHORIZATION
const jwtAuthAdmin = (req, res, next) => {
    const header = req.get("Authorization");
    let response;
    let accessToken;
    if (header && header.startsWith("Bearer")) {
        accessToken = header.split(" ")[1];
    }
    else {
        response = {
            code: "NO_JWT",
            status: 401,
        };
        return res.status(response.status).json(response);
    }
    // Invalid/expired jwt
    let decoded;
    try {
        decoded = (0, drawJwtVerifierService_1.jwtVerifierService)(jsonwebtoken_1.default, accessToken);
        if (decoded.role === "user") {
            response = {
                code: "NOT_ADMIN",
                status: 403,
            };
            return res.status(response.status).json(response);
        }
        else if (decoded.role === "admin") {
            // Admin role jwt - then go to the requested route (Admin route)
            return next();
        }
    }
    catch (err) {
        response = {
            code: "INVALID_OR_EXPIRED_JWT",
            status: 401,
        };
        return res.status(response.status).json(response);
        // send request to /api/refresh-auth
    }
};
exports.jwtAuthAdmin = jwtAuthAdmin;
//# sourceMappingURL=drawAdminAuthMiddleware.js.map