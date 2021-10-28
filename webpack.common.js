const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, "dist", ASSET_PATH === "/" ? "" : ASSET_PATH),
    filename: "static/bundle.js",
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/index.html"),
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    })
    , 
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/scripts/sw.js",
      swDest: "sw.js"
    })
  ],
};
