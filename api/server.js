const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;