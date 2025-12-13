// This is always hoisted to the top. So that all imports of drawpool.js in the 
// real code is converted to the mock automatically by jest.
jest.mock("../../src/model/drawpool.js");

// test the backend using the mock drawpool.js module for running testcontainer for 
// postgres.
//
// Run the backend, then testcontainer, then do the test assertions.

//NOTE:  This pool is the mocked pool (even if we imported the original file)
import pool from "../../src/model/drawpool.js";
import { generateDatabaseContainer } from "./databaseTestContainer.js";
import { startServer } from "./testServer.js";

import { Server } from 'http';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

const TESTPORT = 5000;

let startedTestcontainer: StartedTestContainer;
let startedServer: Server;
beforeAll(async () => {

    //start test container
    const dbTestcontainer: GenericContainer = generateDatabaseContainer();
    startedTestcontainer = await dbTestcontainer.start()

    //start test server
    startedServer = await startServer(TESTPORT);


})

afterAll(async (): void => {

    await startedTestcontainer.stop();
    await new Promise<void>((res, rej) => {
        startedServer.close(() => {
            console.log("Test server has closed from the port: ", TESTPORT);
            res();
        });
    })

})


// WRITE THE TESTSSSSS..THEN RUN IT (NO TIME TO WASTE)
