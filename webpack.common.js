const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {InjectManifest} = require("workbox-webpack-plugin");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')

const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, "dist", ASSET_PATH === "/" ? "" : ASSET_PATH),
    filename: "static/[name].bundle.js",
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
      filename: "static/css/[name].css",
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
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
        imageminPngquant({
          quality: [0.3, 0.5],
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /images\/[\w\d\-\.]+\.(jpe?g|png)/,
          options: {
            quality: 50,
          }
        }
      ],
      overrideExtension: true,
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      fingerprints: false,
      name: "GeoCulinary",
      short_name: "GeoCulinary",
      description: "One Stop Culinary Catalogue",
      start_url: "/",
      inject: true,
      ios: true,
      display: "standalone",
      background_color: "#f5f6fa",
      theme_color: "#e94040",
      icons: [
        {
          src: path.resolve(__dirname, "src/public/images/icon-512.png"),
          destination: path.join('icons'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true
        },
        {
          src: path.resolve(__dirname, "src/public/images/icon-512.png"),
          size: '512x512',
          purpose: 'maskable',
          destination: path.join('icons', 'ios'),
          ios: 'startup'
        }
      ]
    }),
    new InjectManifest({
      swSrc: "./src/scripts/sw.js",
      swDest: "sw.js",
    }),
  ],
};
