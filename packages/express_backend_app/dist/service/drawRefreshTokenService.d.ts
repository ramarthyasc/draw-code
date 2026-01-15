export function refreshTokenGenerateService(crypto: any): any;
export function addAndRevokeRTService(addRefreshToken: any, { userid, token, expiresIn, rotated_from, absoluteExpiresIn }: {
    userid: any;
    token: any;
    expiresIn?: string | undefined;
    rotated_from: any;
    absoluteExpiresIn?: string | undefined;
}, revokeRefreshToken?: () => Promise<void>, detailRefreshToken?: any): Promise<any>;
export function verifyValidityExpiryRevokeRTService(token: any, searchRefreshToken: any, revokeRefreshToken: any, revokeOneRefreshTokenChain: any): Promise<any>;
//# sourceMappingURL=drawRefreshTokenService.d.ts.map