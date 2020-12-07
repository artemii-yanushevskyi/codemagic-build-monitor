module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:all',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    'new-cap': ['error', { capIsNew: false }],
    'max-params': ['error', { max: 4 }],
    'max-lines-per-function': 'off',
    '@typescript-eslint/require-await': 'off',
    'class-methods-use-this': 'off',
    'sort-keys': 'off',
    'multiline-comment-style': 'off',
    'max-lines': 'off',
    'max-statements': 'off',
    'func-style': 'off',
    'one-var': 'off',
    'capitalized-comments': 'off',
    'no-undefined': 'off',
    'no-use-before-define': 'off',
    'no-magic-numbers': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-inline-comments': 'off',
    'line-comment-position': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'max-classes-per-file': 'off',
    'prefer-destructuring': 'off',
    '@typescript-eslint/no-explicit-any': 'off' /* default is warn */,
    'init-declarations': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'id-length': 'off',
  },
};
