import { Router } from "express";

import {
  getAllBookings,
  createBooking,
  getAllBookingsforGuest,
  deleteOneBooking,
} from "./controller";

const bookingRouter = Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.get("/user", getAllBookingsforGuest);
bookingRouter.post("/", createBooking);
bookingRouter.delete("/:id", deleteOneBooking);

export default bookingRouter;
