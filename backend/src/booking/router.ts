import { Router } from "express"

import { getAllBookings, createBooking } from "./controller"

const bookingRouter = Router()

bookingRouter.get("/", getAllBookings)
bookingRouter.post("/", createBooking)

export default bookingRouter
