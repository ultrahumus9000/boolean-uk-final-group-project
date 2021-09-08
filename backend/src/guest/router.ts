import { Router } from "express";

import { getGuestProfile, switchToHost } from "./controller";

const guestRouter = Router();

guestRouter.post("/guest", getGuestProfile);
<<<<<<< HEAD
guestRouter.get("/switch", switchToHost);
=======
guestRouter.post("/switch", switchToHost);
>>>>>>> commit

export default guestRouter;
