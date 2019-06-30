const webpack = require("webpack");
const config = require("../config");

const getDevelopmentConfig = base => ({
  mode: "development",
  devtool: "inline-source-map",
  entry: [
    "webpack-dev-server/client?http://localhost:" + config.devServerPort,
    "webpack/hot/only-dev-server"
  ].concat(base.entry),
  plugins: [new webpack.HotModuleReplacementPlugin()].concat(base.plugins),
  module: Object.assign({}, base.module, {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
  }),
  devServer: {
    host: "localhost",
    allowedHosts: [".ngrok.io"],
    port: config.devServerPort,
    historyApiFallback: true,
    hot: true,
    contentBase: config.assetsDirectory
  }
});

module.exports = base => Object.assign({}, base, getDevelopmentConfig(base));
