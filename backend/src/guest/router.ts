import { Router } from "express";
import getGuestProfile from "./controller";

const guestRouter = Router();

guestRouter.post("/guest", getGuestProfile);

export default guestRouter;
