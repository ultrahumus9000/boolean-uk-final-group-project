import { Router } from "express";
import { login, logout } from "./controller";

const authRouter = Router();

authRouter.route("/login").post(login);

authRouter.route("/logout").get(logout);

export default authRouter;
