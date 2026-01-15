"use strict";
exports.secureRouteGet = (req, res) => {
    const accessToken = res.locals.accessToken;
    const userDetail = res.locals.userDetail;
    return res.json({ accessToken, userDetail });
};
//# sourceMappingURL=drawSecureRouteController.js.map