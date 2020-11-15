const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = 3000;
const API_SERVICE_URL = "https://api.deezer.com";

app.use(
  "/api",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api`]: "",
    },
  })
);

app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port " + PORT);
});
