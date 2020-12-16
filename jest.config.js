const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, 'src'),
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts}', '!**/node_modules/**'],
  moduleDirectories: ['node_modules'],
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'node'],
  cache: false,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ne$': 'jest-transform-nearley',
  },
};
