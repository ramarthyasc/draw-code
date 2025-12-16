import type { Config } from 'jest';

const config: Config = {
    preset: "ts-jest",
    testEnvironment: 'node',
// right now, nothing is imported (no helper functions)
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'], 
    testMatch: [
        "**/__tests__/**/*.?([mc])[jt]s?(x)", "**/tests/**/*.?([mc])[jt]s?(x)"
    ],
    testPathIgnorePatterns : [
        '/helpers/'
    ]
    
};

export default config;
