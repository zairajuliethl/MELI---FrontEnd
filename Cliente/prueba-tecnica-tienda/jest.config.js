module.exports = {
  testEnvironment: 'jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
  ],
  
  moduleFileExtensions: ['js', 'jsx', 'json'],
  
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)'
  ],
  
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub'
  },
  
  moduleDirectories: ['node_modules', 'src'],
  
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    'src/pages/**/*.{js,jsx}',
    'src/routes/**/*.{js,jsx}',
    'src/services/**/*.{js,jsx}',
    'src/utils/**/*.{js,jsx}',
    'src/layout/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**'
  ],
  
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/index.js',
    'src/App.js',
    'src/reportWebVitals.js',
    'src/setupTests.js',
    'src/assets/'
  ],
  
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  coverageReporters: ['text', 'lcov', 'html'],
  
  clearMocks: true,
  
  restoreMocks: true
};