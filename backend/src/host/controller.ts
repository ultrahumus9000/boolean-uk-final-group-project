import { User } from "@prisma/client";
import { Request, Response } from "express";
import db from "../database";
const { user } = db;

async function getHostProfile(req: Request, res: Response) {
  const { username } = req.body;

  try {
    const host = await user.findUnique({
      where: {
        username,
      },
      include: {
        hostProfile: {
          select: {
            bio: true,
          },
        },
      },
    });

    const modifiedGuest = {
      ...host,
      bio: host?.hostProfile?.bio,
    };

    delete modifiedGuest.hostProfile;

    res.json(modifiedGuest);
  } catch (error) {
    res.json(error);
  }
}

<<<<<<< HEAD
async function switchToGuest(req: Request, res: Response) {
  const { id } = req.currentUser as User;
  try {
    const userInfo = await user.findUnique({
      where: {
        id,
      },
    });
    if (userInfo?.guestRole) {
      res.json("true");
    } else {
      res.json("false");
    }
  } catch (error) {
    res.status(401).json(error);
  }
}

export { getHostProfile, switchToGuest };
=======
export { getHostProfile };
>>>>>>> commit
