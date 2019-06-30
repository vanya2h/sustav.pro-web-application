const getConfig = require("./webpack");
const env = process.env.NODE_ENV || "development";

module.exports = getConfig(env);
