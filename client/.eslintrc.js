module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:jsx-a11y/recommended",
	],
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			node: {
				paths: ["src"],
				extensions: [".js", ".jsx", ".tsx", ".ts"],
			},
		},
	},
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
	},
	plugins: ["react", "@typescript-eslint", "jsx-a11y"],
	rules: {
		indent: ["error", "tab", {SwitchCase: 1}],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-mixed-spaces-and-tabs": 0,
		"no-console": ["warn", {allow: ["warn", "error"]}],
		'react/react-in-jsx-scope': "off",
		'react/prop-types': "off",
		'jsx-a11y/media-has-caption': "off"
	},
	ignorePatterns: ["**/config/"],
};
