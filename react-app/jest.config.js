module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testMatch: [
    "<rootDir>/src/**/*.test.js"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "react-scripts/config/jest/babelTransform.js",
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|react-quill|bootstrap)/)"
  ],
  modulePaths: [],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  resetMocks: true
}
