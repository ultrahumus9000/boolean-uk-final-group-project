// import { User } from "@prisma/client"
import { Request, Response } from "express"
import db from "../database"

const { booking } = db

type Booking = {
  total: number
  guestId: number
  start: string
  end: string
  houseId: number
}

async function createBooking(req: Request, res: Response) {
  //   const { id } = req.currentUser as User
  const { total, guestId, start, end, houseId } = req.body as Booking
  console.log("req.body", req.body)

  try {
    const newBooking = await booking.create({
      data: {
        total: total,
        guestId: guestId,
        start: start,
        end: end,
        houseId: houseId,
      },
    })
    res.json(newBooking)
    console.log("newBooking", newBooking)
  } catch (error) {
    res.json(error)
    console.log("error:", error)
  }
}

async function getAllBookings(req: Request, res: Response) {
  try {
    const foundBookings = await booking.findMany({
      select: {
        id: true,
        total: true,
        guestProfile: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        start: true,
        end: true,
        house: {
          select: {
            id: true,
            name: true,
            city: true,
            pictures: {
              select: {
                src: true,
                alt: true,
              },
            },
          },
        },
      },
    })
    res.json(foundBookings)
    console.log("foundBookings", foundBookings)
  } catch (error) {
    res.json(error)
  }
}

export { createBooking, getAllBookings }
