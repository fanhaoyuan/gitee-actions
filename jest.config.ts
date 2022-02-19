import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coveragePathIgnorePatterns: ['src/.umi.*/'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', 'src/.umi.*/'],
};

export default config;
