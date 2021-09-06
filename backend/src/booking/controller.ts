// import { User } from "@prisma/client"
import { User } from ".prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime";
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

    // need to check whether its allow the booking or not

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
    if (error instanceof PrismaClientInitializationError) {
      if (error.errorCode === "P2002") {
        res.json("repeat data");
      } else {
        res.json(error.message);
      }
    } else {
      const newError = error as Error;
      res.json(newError.message);
    }

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

    const rawData = await booking.findMany({
      where: {
        guestId: realGuestId,
      },
      select: {
        start: true,
        end: true,
        total: true,
        house: {
          select: {
            id: true,
            name: true,
            city: true,
            hostProfile: {
              select: {
                user: {
                  select: {
                    username: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const firstFilterData = rawData.map((booking) => {
      const modifiedHouseInfo = {
        id: booking.house.id,
        city: booking.house.city,
        name: booking.house.name,
        hostname: booking.house.hostProfile.user.username,
        hostAvatar: booking.house.hostProfile.user.avatar,
      };
      const newBooking = { ...booking, house: modifiedHouseInfo };
      return newBooking;
    });

    res.json(firstFilterData);
  } catch (error) {
    const errorList = error as Error;
    // if (errorList.) {

    // }
    res.json(error);
    console.log("error:", error);
  }
}

export { createBooking, getAllBookings, getAllBookingsforGuest };
