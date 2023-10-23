const path = require("path");

module.exports = {
  entry: "./index.js",
  mode: "production",
  target: "node",
  output: {
    path: __dirname + "/dist",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  }
};
