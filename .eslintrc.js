module.exports = {
	root: true,
	env: {
		browser: true,
		amd: true,
		node: true,
		es6: true,
	},
	plugins: ['@typescript-eslint', 'tailwindcss', 'simple-import-sort'],
	extends: [
		'next',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'next/core-web-vitals',
		'plugin:tailwindcss/recommended',
	],
	rules: {
		'no-template-curly-in-string': 'error',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'prettier/prettier': 'error',
		indent: 'off',
		'@typescript-eslint/indent': [
			'error',
			'tab',
			{
				SwitchCase: 1,
				ignoredNodes: ['ConditionalExpression'],
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 0,
		'no-unused-vars': 0,
		'react/no-unescaped-entities': 0,
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
	settings: {
		tailwindcss: {
			whitelist: [
				'nfh-background-primary',
				'nfh-background-secondary',
				'nfh-text-primary',
				'nfh-text-secondary',
				'nfh-accent-primary',
				'nfh-accent-secondary',
				'fill-nfh-background-primary',
				'fill-nfh-background-secondary',
				'fill-nfh-text-primary',
				'fill-nfh-text-secondary',
				'fill-nfh-accent-primary',
				'fill-nfh-accent-secondary',
				'border-y',
				'fill-spotify',
				'fill-trakt',
				'h-entry',
				'hentry',
				'dt-published',
				'dt-edited',
				'p-summary',
				'u-url',
				'u-uid',
				'p-name',
				'p-author',
				'h-card',
				'h-feed',
				'e-content',
				'entry-content',
				'user-profile',
				'u-email',
				'u-photo',
				'photo',
				'p-role',
				'role',
				'p-nickname',
				'p-category',
				'note',
				'p-note',
				'p-country-name',
				'p-country-flag',
				'copyright',
				'year',
				'language-',
				'orbit-context',
				'orbit-element',
			],
		},
	},
}
