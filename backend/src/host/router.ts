import { Router } from "express";
import { HostProfile } from ".prisma/client";
<<<<<<< HEAD
import { getHostProfile, switchToGuest } from "./controller";
=======
import { getHostProfile } from "./controller";
>>>>>>> commit

const hostRouter = Router();

hostRouter.post("/host", getHostProfile);
<<<<<<< HEAD
hostRouter.get("/switch", switchToGuest);
=======
>>>>>>> commit

export default hostRouter;
