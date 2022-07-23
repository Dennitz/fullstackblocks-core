module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["next", "prettier", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
