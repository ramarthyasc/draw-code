import type { Config } from 'jest';

const config: Config = {
    projects: [
        "<rootDir>/packages/react_frontend_app/",
        "<rootDir>/packages/express_backend_app/",
    ],
    globalSetup: "<rootDir>/tests/jest.globalSetup.ts",
    globalTeardown: "<rootDir>/tests/jest.globalTeardown.ts",

};

export default config;



