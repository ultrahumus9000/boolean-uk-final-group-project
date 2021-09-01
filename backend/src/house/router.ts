import { Router } from "express";
import { getAllHouses } from "./controller";

const houseRouter = Router();

houseRouter.get("/", getAllHouses);

export default houseRouter;
