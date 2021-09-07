import { Router } from "express";
import { HostProfile } from ".prisma/client";
import { getHostProfile, switchToGuest } from "./controller";

const hostRouter = Router();

hostRouter.post("/host", getHostProfile);
hostRouter.get("/switch", switchToGuest);

export default hostRouter;
