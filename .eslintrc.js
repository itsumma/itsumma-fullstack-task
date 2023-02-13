module.exports = {
	"env": {
		"browser": true,
		"node": true
	},
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"react",
		"import",
		"@typescript-eslint"
	],
	"overrides": [
		{
			"files": [
				"*.ts",
				"*.tsx"
			]
		}
	],
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
        "plugin:@next/next/recommended"
	],
	"rules": {
		"no-prototype-builtins": "off",
		"no-useless-catch": "off",
		"no-unused-vars": "off",
		"import/order": [
			"error",
			{
				"newlines-between": "always"
			}
		],
		"react/no-unknown-property": [
			"error"
		],
		"react/prop-types": 0,
		"@typescript-eslint/no-unused-vars": [
			"error"
		],
		"no-empty": [
			"error",
			{
				"allowEmptyCatch": true
			}
		],
		"react-hooks/exhaustive-deps": "off",
		"indent": [
			"error",
			"tab"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
};
