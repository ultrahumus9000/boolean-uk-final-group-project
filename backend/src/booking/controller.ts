// import { User } from "@prisma/client"
import { User } from ".prisma/client";
import { Request, Response } from "express";
import db from "../database";

const { booking, user } = db;

type Booking = {
  total: number;
  guestId: number;
  start: string;
  end: string;
  houseId: number;
};

async function createBooking(req: Request, res: Response) {
  const { id } = req.currentUser as User;
  const { total, start, end, houseId } = req.body as Booking;

  const startDate = new Date(start);
  const endDate = new Date(end);

  try {
    const guestInfo = await user.findUnique({
      where: {
        id,
      },
      include: {
        guestProfile: true,
      },
    });

    let realGuestId = 0;
    if (guestInfo?.guestProfile) {
      realGuestId = guestInfo?.guestProfile?.id;
    }
    const newBooking = await booking.create({
      data: {
        total: total,
        guestId: realGuestId,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        houseId: houseId,
      },
    });
    res.json(newBooking);
    console.log("newBooking", newBooking);
  } catch (error) {
    const errorList = error as Error;
    res.json(error);
    // if(errorList.code){

    // }

    console.log("error:", error);
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
                avatar: true,
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
    });

    const modifiedBookings = foundBookings.map((booking) => {
      const modifiedBooking = {
        ...booking,
        guestProfile: {
          name: booking.guestProfile.user.username,
          avatar: booking.guestProfile.user.avatar,
        },
        house: {
          houseId: booking.house.id,
          city: booking.house.city,
          name: booking.house.name,
        },
      };
      return modifiedBooking;
    });

    res.json(modifiedBookings);
    console.log("foundBookings", foundBookings);
  } catch (error) {
    res.json({ message: "error" });
  }
}

async function getAllBookingsforGuest(req: Request, res: Response) {
  const { id } = req.currentUser as User;
  try {
    const guestInfo = await user.findUnique({
      where: {
        id,
      },
      include: {
        guestProfile: true,
      },
    });

    let realGuestId = 0;
    if (guestInfo?.guestProfile) {
      realGuestId = guestInfo?.guestProfile?.id;
    }

    const result = await booking.findMany({
      where: {
        guestId: realGuestId,
      },
    });

    res.json(result);
  } catch (error) {
    res.json(error);
    // if(errorList.code){

    // }

    console.log("error:", error);
  }
}

export { createBooking, getAllBookings, getAllBookingsforGuest };
