const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "static/chunks/[name].[contenthash].js",
    chunkFilename: "static/chunks/[id].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[id].[contenthash].css",
    }),
  ]
});
