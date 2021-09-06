"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const bookingRouter = (0, express_1.Router)();
bookingRouter.get("/", controller_1.getAllBookings);
bookingRouter.get("/user", controller_1.getAllBookingsforGuest);
bookingRouter.post("/", controller_1.createBooking);
exports.default = bookingRouter;
