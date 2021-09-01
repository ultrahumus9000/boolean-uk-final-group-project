import { Request, Response } from "express";
import db from "../database";
import { createToken } from "../authgenerator";
import createNewUserWithHash from "./service";

const { hostProfile, guestProfile } = db;

async function createNewUser(req: Request, res: Response) {
  const newUser = req.body;

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
}

export default createNewUser;
// user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
// userId    Int
// bio       String?
// wishlists WishList[]
// reviews   Review[]
// bookings  Booking[]
