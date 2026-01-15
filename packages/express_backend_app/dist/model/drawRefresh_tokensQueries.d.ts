export function addRefreshToken({ userid, token, expires_at, rotated_from, absolute_expires_at }: {
    userid: any;
    token: any;
    expires_at: any;
    rotated_from: any;
    absolute_expires_at: any;
}): Promise<any[]>;
export function searchRefreshToken(token: any): Promise<any[]>;
export function revokeRefreshToken(detailRefreshToken: any): Promise<void>;
export function revokeOneRefreshTokenChain(detailRefreshToken: any): Promise<void>;
//# sourceMappingURL=drawRefresh_tokensQueries.d.ts.map