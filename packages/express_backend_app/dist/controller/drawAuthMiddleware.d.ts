import { Request, Response, NextFunction } from "express";
export type RefreshTokenDetail = {
    id: string;
    userid: string;
    token: string;
    expires_at: Date;
    revoked: boolean;
    rotated_from: string;
    absolute_expires_at: Date;
};
export type CodeResponse = {
    code: string;
    status: number;
};
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
export declare const jwtAuth: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const refreshTokenJwtGen: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=drawAuthMiddleware.d.ts.map