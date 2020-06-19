module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: [
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
