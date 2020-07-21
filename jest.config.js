const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, 'src'),
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  verbose: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'node',
  ],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/$1',
  },
  testEnvironment: 'node',
};
