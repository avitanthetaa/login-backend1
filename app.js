require("./src/db/connection");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mung = require("express-mung");

// Router
const usersRouter = require("./src/router/user-router");

// Create Server
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));

// Use Router
app.use(usersRouter);

// Default Route
app.use("*", (req, res) => {
  res.writeHead(200);
  fs.readFile("./src/pages/index.html", (error, contents) => {
    res.write(contents);
    res.end();
  });
});

// server port define
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server listening on port", port);
});
