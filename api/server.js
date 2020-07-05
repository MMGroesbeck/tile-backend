const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require("./users/users-router");
const solutionsRouter = require("./solutions/solutions-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/solutions", solutionsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;