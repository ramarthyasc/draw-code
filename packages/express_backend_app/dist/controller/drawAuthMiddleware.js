"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenJwtGen = exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drawJwtVerifierService_1 = require("../service/drawJwtVerifierService");
const drawRefreshTokenService_1 = require("../service/drawRefreshTokenService");
const drawRefresh_tokensQueries_1 = require("../model/drawRefresh_tokensQueries");
const drawUsersQueries_1 = require("../model/drawUsersQueries");
const drawJwtCreatorService_1 = require("../service/drawJwtCreatorService");
const crypto_1 = __importDefault(require("crypto"));
const drawRefreshTokenService_js_1 = require("../service/drawRefreshTokenService.js");
const jwtAuth = (req, res, next) => {
    const header = req.get("Authorization");
    let accessToken;
    let response;
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
    }
    catch (err) {
        response = {
            code: "INVALID_OR_EXPIRED_JWT",
            status: 401,
        };
        return res.status(response.status).json(response);
        // send request to /api/refresh-auth
    }
    // Good jwt - then go to the requested route (Secure route)
    next();
};
exports.jwtAuth = jwtAuth;
const refreshTokenJwtGen = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    try {
        let response;
        if (!refreshToken) {
            response = {
                code: "NO_REFRESH_TOKEN",
                status: 401,
            };
            return res.status(response.status).json(response);
        }
        else {
            // There is refresh token
            const detailRefreshToken = await (0, drawRefreshTokenService_1.verifyValidityExpiryRevokeRTService)(refreshToken, drawRefresh_tokensQueries_1.searchRefreshToken, drawRefresh_tokensQueries_1.revokeRefreshToken, drawRefresh_tokensQueries_1.revokeOneRefreshTokenChain);
            if (!detailRefreshToken) {
                response = {
                    code: "INVALID_REFRESH_TOKEN",
                    status: 401,
                };
                return res.status(response.status).json(response);
            }
            else {
                // Refresh token is Valid(non Revoked) and non Expired 
                /// User manually signsout
                if (req.body?.revokeRefreshToken) {
                    await (0, drawRefresh_tokensQueries_1.revokeRefreshToken)(detailRefreshToken);
                    response = {
                        code: "REFRESH_TOKEN_REVOKED",
                        status: 401,
                    };
                    return res.status(response.status).json(response);
                }
                /// 
                const dummyUserPayload = { sub: detailRefreshToken.userid };
                const [userDetail] = await (0, drawUsersQueries_1.searchUser)(dummyUserPayload);
                // Add role to the Userdetail before sending to the Server
                let userDetailWithRole;
                if (userDetail.email === "amarthyasreechand@gmail.com") {
                    userDetailWithRole = { ...userDetail, role: "admin" };
                }
                else {
                    userDetailWithRole = { ...userDetail, role: "user" };
                }
                // Done
                const accessToken = (0, drawJwtCreatorService_1.jwtCreatorService)(jsonwebtoken_1.default, userDetailWithRole);
                let refreshToken = (0, drawRefreshTokenService_js_1.refreshTokenGenerateService)(crypto_1.default);
                refreshToken = await (0, drawRefreshTokenService_js_1.addAndRevokeRTService)(drawRefresh_tokensQueries_1.addRefreshToken, {
                    userid: userDetailWithRole.userid,
                    token: refreshToken,
                    rotated_from: detailRefreshToken.id,
                }, drawRefresh_tokensQueries_1.revokeRefreshToken, detailRefreshToken);
                let secure;
                if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
                    secure = false;
                }
                else {
                    secure = true;
                }
                // Set new RT in cookie & Send new JWT  
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: Number(process.env.RT_EXPIRES_IN),
                    secure: secure, // As the localserver is not https. Change it to secure when in Production.
                    sameSite: "lax",
                    path: "/api/refresh-auth",
                });
                return res.json({ accessToken, userDetail: userDetailWithRole });
                /// Redirect the client to the requested route (Do it from the frontend with the new JWT - For Secure routes.)
            }
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.refreshTokenJwtGen = refreshTokenJwtGen;
// export const uiJwtAuth = (req: Request, res: Response) => {
//     const header: string | undefined = req.get("Authorization");
//     let accessToken: string | undefined;
//     if (header && header.startsWith("Bearer")) {
//         accessToken = header.split(" ")[1];
//     }
//
//
//     let response: CodeResponse;
//     // Invalid/expired jwt
//     let decoded: IJwtVerifiedPayload;
//     try {
//         decoded = jwtVerifierService(jwt, accessToken);
//     } catch (err) {
//         response = {
//             code: "INVALID_OR_EXPIRED_JWT",
//             status: 401,
//         }
//         return res.status(response.status).json(response)
//     }
//
//     // Good jwt - then go to the requested route (Loggedin UI)
//     response = {
//         code: "VALID_JWT",
//         status: 200,
//     }
//     return res.status(response.status).json(response);
// }
//
//# sourceMappingURL=drawAuthMiddleware.js.map