"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const hostRouter = (0, express_1.Router)();
hostRouter.post("/host", controller_1.getHostProfile);
<<<<<<< HEAD
hostRouter.get("/switch", controller_1.switchToGuest);
=======
>>>>>>> commit
exports.default = hostRouter;
