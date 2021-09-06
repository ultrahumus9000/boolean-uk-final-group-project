import { Router } from "express";

import {
  getAllBookings,
  createBooking,
  getAllBookingsforGuest,
} from "./controller";

const bookingRouter = Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.get("/user", getAllBookingsforGuest);
bookingRouter.post("/", createBooking);

export default bookingRouter;
