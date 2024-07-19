// jest.config.mjs
export default {
	transform: {
	  '^.+\\.jsx?$': 'babel-jest',
	  '^.+\\.mjs$': 'babel-jest'
	},
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx', 'mjs'],
  };
  