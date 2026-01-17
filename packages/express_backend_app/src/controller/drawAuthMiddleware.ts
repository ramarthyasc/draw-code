import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtVerifierService } from "../service/drawJwtVerifierService";
import { verifyValidityExpiryRevokeRTService } from "../service/drawRefreshTokenService";
import { searchRefreshToken, revokeRefreshToken, revokeOneRefreshTokenChain, addRefreshToken } from "../model/drawRefresh_tokensQueries";
import { searchUser } from "../model/drawUsersQueries";
import { jwtCreatorService } from "../service/drawJwtCreatorService";
import crypto from "crypto";
import { refreshTokenGenerateService, addAndRevokeRTService } from "../service/drawRefreshTokenService.js";

// refresh_tokens table schema : (\d+ refresh_tokens)
// id UUID PRIMARY KEY DEFAULT gen_random_uuid(), userid TEXT UNIQUE REFERENCES users(userid), token TEXT UNIQUE, expires_at timestamptz
// , revoked boolean DEFAULT false, rotated_from uuid, absolute_expires_at timestamptz
export type RefreshTokenDetail = {
    id: string;
    userid: string;
    token: string;
    expires_at: Date;
    revoked: boolean;
    rotated_from: string;
    absolute_expires_at: Date;

}
export type CodeResponse = {
    code: string;
    status: number
}
//userdetail : userid, name, email, picture
export interface IUserDetail {
    userid: string;
    name: string;
    email: string;
    picture: string;
}
export interface IUserDetailWithRole extends IUserDetail {
    role: "user" | "admin";
}
export interface IJwtVerifiedPayload extends IUserDetailWithRole {
    iat: number;
    exp: number;
}

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {

    const header: string | undefined = req.get("Authorization");
    let accessToken: string | undefined;
    let response: CodeResponse;

    if (header && header.startsWith("Bearer")) {
        accessToken = header.split(" ")[1];
    } else {
        response = {
            code: "NO_JWT",
            status: 401,
        }
        return res.status(response.status).json(response)
    }



    // Invalid/expired jwt
    let decoded: IJwtVerifiedPayload;
    try {
        decoded = jwtVerifierService(jwt, accessToken);
    } catch (err) {
        response = {
            code: "INVALID_OR_EXPIRED_JWT",
            status: 401,
        }
        return res.status(response.status).json(response)
        // send request to /api/refresh-auth
    }

    // Good jwt - then go to the requested route (Secure route)
    next();
}


export const refreshTokenJwtGen = async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken: string | undefined = req.cookies?.refreshToken;


    try {
        let response: CodeResponse;
        if (!refreshToken) {
            response = {
                code: "NO_REFRESH_TOKEN",
                status: 401,
            }
            return res.status(response.status).json(response);
        } else {
            // There is refresh token

            const detailRefreshToken: RefreshTokenDetail | undefined = await verifyValidityExpiryRevokeRTService(
                refreshToken,
                searchRefreshToken,
                revokeRefreshToken, revokeOneRefreshTokenChain);

            if (!detailRefreshToken) {
                response = {
                    code: "INVALID_REFRESH_TOKEN",
                    status: 401,
                }
                return res.status(response.status).json(response);

            } else {
                // Refresh token is Valid(non Revoked) and non Expired 

                /// User manually signsout
                if (req.body?.revokeRefreshToken) {
                    await revokeRefreshToken(detailRefreshToken);
                    response = {
                        code: "REFRESH_TOKEN_REVOKED",
                        status: 401,
                    }
                    return res.status(response.status).json(response);
                }
                /// 

                const dummyUserPayload: { sub: string } = { sub: detailRefreshToken.userid };
                const [userDetail]: [IUserDetail] = await searchUser(dummyUserPayload);


                // Add role to the Userdetail before sending to the Server
                let userDetailWithRole: IUserDetailWithRole;
                if (userDetail.email === "amarthyasreechand@gmail.com") {
                    userDetailWithRole = { ...userDetail, role: "admin" };
                } else {
                    userDetailWithRole = { ...userDetail, role: "user" };
                }
                // Done

                const accessToken = jwtCreatorService(jwt, userDetailWithRole);

                let refreshToken: string = refreshTokenGenerateService(crypto);

                refreshToken = await addAndRevokeRTService(addRefreshToken, {
                    userid: userDetailWithRole.userid,
                    token: refreshToken,
                    rotated_from: detailRefreshToken.id,
                }, revokeRefreshToken, detailRefreshToken);

                let secure: boolean;
                if (process.env.NODE_ENV === "development") {
                    secure = false;
                } else {
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

    } catch (err) {
        return next(err);
    }

}

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


