/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@atoms(.*)$': '<rootDir>/src/presentation/components/atoms',
    '^@utils(.*)$': '<rootDir>/src/core/utils',
    '^@molecules(.*)$': '<rootDir>/src/presentation/components/molecules',
    '^@swr(.*)$': '<rootDir>/src/core/http/swr',
    '^@url(.*)$': '<rootDir>/src/core/http/url',
  },
};
