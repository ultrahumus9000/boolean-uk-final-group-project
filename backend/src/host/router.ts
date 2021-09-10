import { Router } from "express";
import { HostProfile } from ".prisma/client";

import {
  getHostProfile,
  switchToGuest,
  fetchHouseForHost,
  deleteOneHost,
} from "./controller";

const hostRouter = Router();

hostRouter.post("/host", getHostProfile);

hostRouter.get("/houses", fetchHouseForHost);

hostRouter.get("/switch", switchToGuest);
hostRouter.delete("/", deleteOneHost);

export default hostRouter;
