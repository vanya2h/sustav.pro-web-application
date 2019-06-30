const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getProductionConfig = base => ({
  mode: "production",
  devtool: false,
  output: Object.assign({}, base.output, {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  }),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css"
    })
  ].concat(base.plugins),
  module: Object.assign({}, base.module, {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: "[name]-[local]-[hash:base64:5]"
            }
          },
          "postcss-loader",
          {
            loader: "webpack-append"
          }
        ]
      }
    ].concat(base.module.rules)
  })
});

module.exports = base => Object.assign({}, base, getProductionConfig(base));
