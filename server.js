// server.js
const dotenv = require("dotenv").config();
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 4001;
const local = process.env.LOCAL == "true";
const express = require("express");

app.prepare().then(() => {
  const server = express();
  server.all("*", (req, res) => handle(req, res));
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${process.env.SITE}`);
  });
});
