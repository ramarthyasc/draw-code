// Run the backend, then testcontainer, then do the test assertions.

import { generateDatabaseContainer } from "./helpers/databaseTestContainer";
import { startServer } from "./helpers/testServer";

import { Server } from 'http';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
// when i import this module, it's the mocked module that will be imported
// (not the real one in the jest test process)
import pool from '../../src/model/drawpool';

// test based imports
import request from 'supertest';


// Mocked modules are always hoisted to the top. So that all imports of drawpool.js in the 
// real code in the "test node process" is converted to the mock module automatically by jest.
jest.mock("../../src/model/drawpool.js");
jest.mock("../../src/service/drawVerifyGoogleJWTService.js");
jest.mock("../../src/service/drawVerifyOrAddUserService.js");


const TESTPORT: number = 5000;

let startedTestcontainer: StartedTestContainer;
let startedServer: Server;

beforeAll(async () => {

    //start test container
    const dbTestcontainer: GenericContainer = generateDatabaseContainer();
    startedTestcontainer = await dbTestcontainer.start()

    //start test server
    startedServer = await startServer(TESTPORT);


})

afterAll(async (): Promise<void> => {

    jest.resetAllMocks();
    
    // pg client js object's tcp connection with the db server port is still there. stop it.
    await pool.end();

    // server js object's (Server object) tcp connection with the port is still there. stop it.
    await new Promise<void>((res, rej) => {
        startedServer.close(() => {
            console.log("Test server is closed and has freed the port: ", TESTPORT);
            res();
        });
    })

    // stop the container containing the db server 
    await startedTestcontainer.stop();

})


// WRITE THE TESTSSSSS..THEN RUN IT (NO TIME TO WASTE)

describe('Auth Signin', () => {
    test('send signin credentials & receive accessToken and userDetail json', async () => {

    await request(startedServer)
        .post('/draw-login')
        .send({
            credential: {
                sub: "mockUserid",
                name: "mockName",
                email: "mockEmail",
                picture: "mockPicture"
            }
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
            // 3 parts of the accesstoken is being asserted
            const accessTokenParts = res.body.accessToken.split(".");
            expect(accessTokenParts).toHaveLength(3);
            
            // userDetail being send 
            expect(res.body.userDetail).toEqual({
                    userid: "mockUserid",
                    name: "mockName",
                    email: "mockEmail",
                    picture: "mockPicture"
            })
        })
        
    })


})

