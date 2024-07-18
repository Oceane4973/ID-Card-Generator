module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    setupFiles: ['./jest.setup.js'],
  };
  