"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./user/router"));
const router_2 = __importDefault(require("./auth/router"));
const middleware_1 = __importDefault(require("./middleware"));
const router_3 = __importDefault(require("./house/router"));
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var app = express();
//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/houses", router_3.default);
app.use(middleware_1.default);
//check token
app.use(router_2.default);
// general routes
app.use("/users", router_1.default);
app.all("*", (req, res) => {
    res.status(400).json("No Routes");
});
module.exports = app;
