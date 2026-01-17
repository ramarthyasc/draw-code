const { verifyOrAddUserService } = require('../service/drawVerifyOrAddUserService.js');
const { verifyGoogleJWTService } = require('../service/drawVerifyGoogleJWTService.js');
const { userAddReturn, searchUser, updatePicture } = require('../model/drawUsersQueries.js');
const { jwtCreatorService } = require('../service/drawJwtCreatorService.js');
const { refreshTokenGenerateService, addAndRevokeRTService } = require('../service/drawRefreshTokenService.js');
const { addRefreshToken } = require('../model/drawRefresh_tokensQueries.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


exports.googleJwtVerifyPost = async (req, res, next) => {

    const token = req.body.credential;
    let userPayload;
    try {
        // userPayload is the jwt payload from Google authorization library : Check Google authorization for webapp -look at Credentials.
        userPayload = await verifyGoogleJWTService(client, token);

    } catch (err) {
        console.error(err);
        return next(err);
    }

    let userDetail;
    try {
        userDetail = await verifyOrAddUserService(userPayload, searchUser, userAddReturn, updatePicture, fs, path); //arguments give
    } catch (err) {
        console.error(err);
        return next(err);
    }

    //userdetail : userid, name, email, picture
    req.userDetail = userDetail;
    next();
}

exports.jwtRefreshTokenCreatorPost = async (req, res) => {

    // add Role (admin or user) into jwt
    let userDetail;
    if (req.userDetail.email === "amarthyasreechand@gmail.com") {
        userDetail = { ...req.userDetail, role: "admin" };
    } else {
        userDetail = { ...req.userDetail, role: "user" };
    }
    //Done

    //create jwt using the userDetail with role
    const accessToken = jwtCreatorService(jwt, userDetail);
    let refreshToken = refreshTokenGenerateService(crypto);

    //save refresh token in database with schema - id (primarykey, default = uuid), userid, token, expires_at, revoked (db default = false), rotated_from
    refreshToken = await addAndRevokeRTService(addRefreshToken,
        {
            userid: userDetail.userid,
            token: refreshToken,
            rotated_from: null
        });

    let secure;
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
        secure = false;
    } else {
        secure = true;
    }
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.RT_EXPIRES_IN),
        secure: secure, // As the localserver is not https. Change it to secure when in Production.
        sameSite: "lax",
        path: "/api/refresh-auth",
    });

    res.json({ accessToken, userDetail });
}


