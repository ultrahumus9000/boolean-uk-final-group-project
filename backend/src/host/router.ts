import { Router } from "express";
import { HostProfile } from ".prisma/client";
import { getHostProfile } from "./controller";

const hostRouter = Router();

hostRouter.post("/host", getHostProfile);

export default hostRouter;
