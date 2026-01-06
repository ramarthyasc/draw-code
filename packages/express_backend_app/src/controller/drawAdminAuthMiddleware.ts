import type { Request, Response, NextFunction } from "express";
import type { CodeResponse, IJwtVerifiedPayload } from "./drawAuthMiddleware";
import { jwtVerifierService } from "../service/drawJwtVerifierService";
import jwt from "jsonwebtoken";

// AUTHORIZATION
export const jwtAuthAdmin = (req: Request, res: Response, next: NextFunction) => {

    const header: string | undefined = req.get("Authorization");
    let accessToken: string | undefined;
    if (header && header.startsWith("Bearer")) {
        accessToken = header.split(" ")[1];
    }
    console.log(accessToken)


    let response: CodeResponse;
    // Invalid/expired jwt
    let decoded: IJwtVerifiedPayload;
    try {
        decoded = jwtVerifierService(jwt, accessToken);

        if (decoded.role === "user") {

            response = {
                code: "NOT_ADMIN",
                status: 403,
            }
            return res.status(response.status).json(response);

        } else if (decoded.role === "admin") {
            // Admin role jwt - then go to the requested route (Admin route)
            return next();
        }

    } catch (err) {
        response = {
            code: "INVALID_OR_EXPIRED_JWT",
            status: 401,
        }
        return res.status(response.status).json(response)
        // send request to /api/refresh-auth
    }

}
