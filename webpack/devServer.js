import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "../webpack.config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

// import fs from "fs";
// import path from "path";
import { renderApp } from "../src/dev/renderApp";

const compiler = Webpack({
  ...webpackConfig,
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        content: renderApp()
      },
      filename: "index.html",
      template: "public/index.html"
    })
  ]
});

const devServerOptions = {
  ...webpackConfig.devServer,
  proxy: {
    "*": "http://localhost:3000/dist/index.html"
  }
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
