import { Router } from "express";
import { getAllHouses, deleteHouseById, getOneHouse } from "./controller";

const houseRouter = Router();

houseRouter.get("/", getAllHouses);

houseRouter.get("/:id", getOneHouse);

houseRouter.delete("/:id", deleteHouseById);

export default houseRouter;
