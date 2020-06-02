module.exports = {
    rootDir: "../",
    roots: [
        "<rootDir>/tests/"
    ],
    modulePathIgnorePatterns: [
        "<rootDir>/tests/env.ts",
        "<rootDir>/tests/init.ts",
        "<rootDir>/tests/teardown.ts"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/tests/.*|(\\.|/)(jest|spec))\\.tsx?$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    collectCoverage: false,
    globalSetup: "<rootDir>/tests/init.ts",
    globalTeardown: "<rootDir>/tests/teardown.ts"
};
