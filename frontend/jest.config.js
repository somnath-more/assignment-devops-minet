const { defaults } = require('jest-config');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  passWithNoTests: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/services/',
    '/utils/',
    '/context/',
  ],
  moduleNameMapper: {
    '\\.(svg)$': 'jest-svg-transformer',
    '\\.css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-stub',
    '^.+\\.png$': 'jest-transform-stub',
    '^.+\\.(ts|tsx)$': 'jest-transform-stub',
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
