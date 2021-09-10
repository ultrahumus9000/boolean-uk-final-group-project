import { Router } from "express";

import { getGuestProfile, switchToHost, deleteOneGuest } from "./controller";

const guestRouter = Router();

guestRouter.post("/guest", getGuestProfile);

guestRouter.delete("/", deleteOneGuest);

guestRouter.get("/switch", switchToHost);

export default guestRouter;
