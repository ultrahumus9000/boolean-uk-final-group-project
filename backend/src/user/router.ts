import { Router } from "express";
import createNewUser from "./controller";

const userRouter = Router();

userRouter.route("/users").post(createNewUser);

export default userRouter;
