module.exports = {
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    it: true
  },
  plugins: ["react", "react-hooks"],
  ignorePatterns: ["public/", "build/"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: { quotes: ["error", "single"] },
  parser: "babel-eslint"
};
