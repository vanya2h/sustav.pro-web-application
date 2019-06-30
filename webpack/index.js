const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../config");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const getDevelopmentConfig = require("./development.config");
const getProductionConfig = require("./production.config");
 
const base = {
  entry: [`${config.sourceDirectory}/index.tsx`],
  output: {
    path: config.buildDirectory,
    publicPath: "/", 
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js"
  }, 
  resolve: {
    extensions: [".js", ".tsx"],
    alias: {
      "~": config.sourceDirectory
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
      },
      {
        test: /\.(png | gif | jpeg | svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/png"
        }
      }
    ]
  },
  plugins: [
    new DuplicatePackageCheckerPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      API: "production"
    }),
    new HtmlWebpackPlugin({
      template: `${config.sourceDirectory}/index.html`,
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        }
      }
    }
  }
};

const getConfig = env => {
  if (env === "production") {
    return getProductionConfig(base);
  }

  if (env === "development") {
    return getDevelopmentConfig(base);
  }

  throw new Error("Environment is not specified");
};

module.exports = getConfig;
