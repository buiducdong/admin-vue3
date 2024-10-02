const path = require("path");
const webpack = require("webpack");

module.exports = {
  chainWebpack: (config) => {
    // Rule handle file SVG in folder 'src/icons/svg'
    config.module.rule("svg").exclude.add(path.resolve("src/icons/svg")).end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]", // Create id for every symbol, use name file SVG
      })
      .end();
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
};
