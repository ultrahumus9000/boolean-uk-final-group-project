import { Request, Response } from "express";
import db from "../database";

import { User } from "@prisma/client";

const { user, guestProfile } = db;

async function getGuestProfile(req: Request, res: Response) {
  const { username } = req.body;

  try {
    const guest = await user.findUnique({
      where: {
        username,
      },
      include: {
        guestProfile: {
          select: {
            bio: true,
          },
        },
      },
    });
    const modifiedGuest = {
      ...guest,
      bio: guest?.guestProfile?.bio,
    };
    delete modifiedGuest.guestProfile;
    res.json(modifiedGuest);
  } catch (error) {
    res.json(error);
  }
}

export default getGuestProfile;
