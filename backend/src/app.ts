var express = require("express");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

module.exports = app;
