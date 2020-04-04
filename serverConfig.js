const express = require("express");
// init app
const app = express();
// create server instance
const http = require("http").createServer(app);

module.exports = {
  app,
  http
};
