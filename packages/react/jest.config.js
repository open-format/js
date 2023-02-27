const config = {
  testTimeout: 10000,
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  verbose: true,
};

module.exports = config;
