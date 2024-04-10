// jest.config.js
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@_decorators/(.*)$": "<rootDir>/decorators/$1",
    "^@_kakaoAPI/(.*)$": "<rootDir>/kakaoAPI/$1",
    "^@_middlewares/(.*)$": "<rootDir>/middlewares/$1",
    "^@_modules/(.*)$": "<rootDir>/modules/$1",
    "^@_spec/(.*)$": "<rootDir>/spec/$1",
    "^@_tests/(.*)$": "<rootDir>/tests/$1",
    "^@_types/(.*)$": "<rootDir>/types/$1",
  },
};
