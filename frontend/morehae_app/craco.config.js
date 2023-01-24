// const cracoAlias = require("craco-alias");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    }
  }
}