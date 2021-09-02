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

export { getHostProfile };
