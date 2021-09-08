"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const guestRouter = (0, express_1.Router)();
guestRouter.post("/guest", controller_1.getGuestProfile);
<<<<<<< HEAD
guestRouter.get("/switch", controller_1.switchToHost);
=======
guestRouter.post("/switch", controller_1.switchToHost);
>>>>>>> commit
exports.default = guestRouter;
