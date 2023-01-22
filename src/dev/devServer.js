import { renderApp } from "./renderApp";
import express from "express";
import webpack from "webpack";
import webpackConf from "../../webpack.config";
import middleware from "webpack-dev-middleware";
import isObject from "is-object";

const compiler = webpack(webpackConf);

const devMiddleware = middleware(compiler, { serverSideRender: true });

function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

const port = 3000;

const app = express();

app.use(devMiddleware);
app.use((req, res) => {
  const { devMiddleware } = res.locals.webpack;
  const outputFileSystem = devMiddleware.outputFileSystem;
  const jsonWebpackStats = devMiddleware.stats.toJson();
  const { assetsByChunkName, outputPath } = jsonWebpackStats;

  if (req.path.endsWith("js") || req.path.endsWith("css")) {
    return res.send(outputFileSystem.readFileSync(`${outputPath}/${req.path}`));
  }

  res.send(`
  <!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
    <style>
    ${normalizeAssets(assetsByChunkName.main)
      .filter((path) => path.endsWith(".css"))
      .map((path) => outputFileSystem.readFileSync(path.join(outputPath, path)))
      .join("\n")}
    </style>
  </head>
  <body>
    <div id="root">${renderApp()}</div>
    ${normalizeAssets(assetsByChunkName.main)
      .filter((path) => path.endsWith(".js"))
      .map((path) => `<script src="${path}"></script>`)
      .join("\n")}
  </body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`Development Server is running on http://localhost:${port}`);
});

// const requestListener = function (req, res) {
//   res.writeHead(200);

//   res.end(renderApp());
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//   console.log(`Development Server is running on http://${host}:${port}`);
// });
