import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import express from "express";

import webpackConfig from "../webpack.config";

import fs from "fs";
import path from "path";
import { renderApp } from "../src/dev/renderApp";

const compiler = Webpack(webpackConfig);

const devServerOptions = {
  ...webpackConfig.devServer,
  setupMiddlewares(middleware, devServer) {
    if (!devServer) {
      throw new Error("webpack-dev-server is not defined");
    }

    middleware.push({
      name: "ssr",
      path: "/",
      middleware(req, res) {
        fs.readFile(
          path.join(__dirname, "../public/index.html"),
          (err, data) => {
            if (err) res.send("error");

            res.send(
              data
                .toString()
                .replace(
                  `<div id="root"></div>`,
                  `<div id="root">${renderApp()}</div>`
                )
            );
          }
        );
      }
    });
    middleware.push(express.static(path.join(__dirname, "../public")));

    return middleware;
  }
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
