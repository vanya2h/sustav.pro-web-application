const path = require("path");

const config = {
  sourceDirectory: path.resolve(".", "source"),
  buildDirectory: path.resolve(".", "build"),
  assetsDirectory: path.resolve(".", "assets"),
  devServerPort: 4500
};

module.exports = config;
 