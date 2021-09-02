import { Request, Response } from "express";
import db from "../database";

import createNewUserWithHash from "./service";

const { hostProfile, guestProfile } = db;

async function createNewUser(req: Request, res: Response) {
  const newUser = req.body;
  try {
    const modifiedUser = await createNewUserWithHash(newUser);

    if (newUser.guestProfile) {
      const result = await guestProfile.create({
        data: {
          bio: newUser.bio,
          userId: modifiedUser.id,
        },
      });
      res.json(result);
    } else {
      const result = await hostProfile.create({
        data: {
          bio: newUser.bio,
          userId: modifiedUser.id,
        },
      });
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export default createNewUser;
