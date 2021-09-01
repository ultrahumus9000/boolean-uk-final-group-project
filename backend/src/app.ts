import userRouter from "./user/router";
import authRouter from "./auth/router";
import tokenMiddleware from "./middleware";
import houseRouter from "./house/router";
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

app.use("/houses", houseRouter);

app.use(tokenMiddleware);

//check token
app.use(authRouter);

// general routes
app.use("/users", userRouter);

app.all(
  "*",
  (
    req: Request,
    res: {
      status: (arg0: number) => {
        json: { (arg0: string): void };
      };
    }
  ) => {
    res.status(400).json("No Routes");
  }
);

module.exports = app;
