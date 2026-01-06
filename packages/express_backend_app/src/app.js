const express = require('express');
/**
    * @type {import('express').Express}
    */
const app = express();
require('dotenv').config();
console.log('cwd: ', process.cwd())
const cookieParser = require('cookie-parser');


const path = require('path');
const signupRouter = require('./routers/signupRouter');
const userbaseRouter = require('./routers/userbaseRouter.js');
const { userLoginGet, userLoginAuthPost } = require('./controller/loginController.js');
const { jwtVerification, userHomeGet, userProblemsetGet } = require('./controller/secureController.js')
const { gameDetailGet } = require('./controller/gameDetailController.js');

const { googleJwtVerifyPost, jwtRefreshTokenCreatorPost } = require('./controller/drawLoginController.js');
const { rotatingRefreshTokenAndJwt } = require('./controller/drawRotRefreshTokenController.js');
const { secureRouteGet } = require('./controller/drawSecureRouteController.js')
const { preflightOptionsSetter, corsAllowResponseSetter } = require('./controller/drawCorsController.js');
const { questionsGet } = require('./controller/drawQuestionsController.js');
const { submitPost } = require('./controller/drawCompilerController.js');
const { uiJwtAuth, refreshTokenJwtGen } = require('./controller/drawAuthMiddleware');
const { drawSecureRouter } = require('./routers/drawSecureRouter');
const { drawNonSecureRouter } = require('./routers/drawNonSecureRouter');
const { drawAdminRouter } = require('./routers/drawAdminRouter')


///////////////////////////////////////////////////////////////////
//DrawLogin App


//DrawLogin App

app.set('views', [
    path.join(__dirname, 'view'),
    path.join(__dirname, 'view/miniCrud/'),
    path.join(__dirname, 'assets')
]);

app.set('view engine', 'ejs');

app.get('views').forEach(view => {
    app.use(express.static(view, { index: false }))
})
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //cookieParser() returns a middleware.
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
});
app.use('/admin', userbaseRouter); //Mini-CRUD app
app.use('/signup', signupRouter);

//For Login, Add logic to decode body
//body should have email & password 

//Check if the user with the given email exists in the USERs array
//Also ensure that the password is the same
//If pass is same, return 200 status code to client.
//If the password not same, return back 401 status code to client.
app.route('/login')
    .get(userLoginGet)
    .post(userLoginAuthPost);

//secure routes
app.get('/home', jwtVerification, userHomeGet);
app.get('/problemset', jwtVerification, userProblemsetGet);

//NOTE: DrawLogin App
//
app.use('/proPic', express.static(path.join(__dirname, "./public/proPic/")));

// Lightweight session check for the frontend (not for security) = UI HELPER- DON'T NEED - CONFUSING
// app.use('/jwt-ui-auth', uiJwtAuth);


app.options('/*splat', preflightOptionsSetter);
app.post('/draw-login', corsAllowResponseSetter, googleJwtVerifyPost, jwtRefreshTokenCreatorPost);
// app.route('/draw-secure')
//   .get(corsAllowResponseSetter, rotatingRefreshTokenAndJwt, secureRouteGet)
//   .post(corsAllowResponseSetter, rotatingRefreshTokenAndJwt);
app.get("/draw-question{/:question}", corsAllowResponseSetter, questionsGet); // {/:question} is optional. ie; / is optional ,and the route param is optional

//Secure routes - Router
app.use('/api', drawSecureRouter);

//Non-secure routes - For Non secure Data
app.use('/docs', drawNonSecureRouter);

// Admin route
app.use('/admin', drawAdminRouter);

//For logging the errors in Production into the terminal(And importantly when testing) 
//& Most importantly streamlining the server error flow using next(err) & then handle from Frontend too the 
//default error.. always
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something broke !!")
})
//// For after React build
// app.use(express.static(path.join(__dirname, "dist")))
/// for all the routes other than that of the backend api - home "/", "/drawcode"
// app.get('/*splat', (req, res)=> {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
// })


//DrawLogin App
///////////////////////////////////////////////////////////////////
//

module.exports = app;
