/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	coveragePathIgnorePatterns: [
		"<rootDir>/build/",
		"<rootDir>/node_modules/",
		"<rootDir>/server.ts",
		"<rootDir>/src/api/v3/models/",
		"<rootDir>/src/api/v3/validators/",
	],
	collectCoverage: true,
	coverageThreshold: {
		global: {
			lines: 85,
		},
	},
};
