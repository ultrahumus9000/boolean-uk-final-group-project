import { Router } from "express";
import { getAllHouses, deleteHouseById } from "./controller";

const houseRouter = Router();

houseRouter.get("/", getAllHouses);
houseRouter.delete("/:id", deleteHouseById);

export default houseRouter;
