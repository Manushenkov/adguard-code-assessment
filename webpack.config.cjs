/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

// Optimize build speed for development by removing minification
const isProduction = process.env.BUILD_ENV === "production";

module.exports = {
  mode: process.env.BUILD_ENV,
  target: "web",
  devtool: "source-map",
  cache: {
    type: "filesystem",
  },
  optimization: {
    minimize: isProduction,
    splitChunks: false,
  },
  entry: {
    background: "./src/background/background.ts",
    popup: "./src/pages/popup/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("manifest.json"),
          to: path.resolve("dist"),
        },
        {
          from: path.resolve("src/pages/popup/index.html"),
          to: path.resolve("dist/popup.html"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
  },
};
