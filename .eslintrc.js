module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-confusing-arrow': 'off',
    'no-mixed-operators': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
};
