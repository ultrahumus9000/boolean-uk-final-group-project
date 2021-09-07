import { Router } from "express";
import {
  getAllHouses,
  deleteHouseById,
  getOneHouse,
  createOneHouse,
  updateOneHouse,
} from "./controller";

const houseRouter = Router();

houseRouter.get("/", getAllHouses);

houseRouter.get("/:id", getOneHouse);

houseRouter.patch("/:id", updateOneHouse);

houseRouter.post("/", createOneHouse);

houseRouter.delete("/:id", deleteHouseById);

export default houseRouter;
