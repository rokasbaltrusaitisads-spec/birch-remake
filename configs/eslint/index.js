module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true,
    browser: true
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist", ".next", "coverage"],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn"
  }
};
