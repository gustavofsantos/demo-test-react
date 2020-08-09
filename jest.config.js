module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(js|jsx)'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageReporters: ['text'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.ya?ml$': 'yaml-jest'
  }
}
