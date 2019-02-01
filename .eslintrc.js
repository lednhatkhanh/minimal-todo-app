module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
  },
  extends: ["airbnb", "prettier"],
  plugins: ["graphql", "prettier"],
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
  rules: {
    "prettier/prettier": "error",
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaJson: require("./schema.json"),
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": false,
    "react/forbid-foreign-prop-types": 1,
    "react/forbid-prop-types": [1, { forbid: ["any"] }],
  },
};
