"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const houseRouter = (0, express_1.Router)();
houseRouter.get("/", controller_1.getAllHouses);
houseRouter.delete("/:id", controller_1.deleteHouseById);
exports.default = houseRouter;
