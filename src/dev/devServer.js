import { renderApp } from "./renderApp";
import http from "http";

const host = "localhost";
const port = 3000;

const requestListener = function (req, res) {
  res.writeHead(200);

  res.end(renderApp());
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Development Server is running on http://${host}:${port}`);
});
