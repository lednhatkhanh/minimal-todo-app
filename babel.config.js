// eslint-disable-next-line func-names
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./"],
          alias: {
            "~": "./src",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["transform-react-remove-prop-types"],
      },
    },
  };
};
