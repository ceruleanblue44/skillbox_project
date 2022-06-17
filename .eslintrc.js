module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { 'code': 300 }],
    "object-shorthand": ["error", "always", { "avoidQuotes": false }],
    "no-return-assign": "off",
    "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
  },
};
