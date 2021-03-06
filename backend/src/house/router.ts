import { Router } from "express";
import { uploadMiddleware } from "../middleware";
import tokenMiddleware from "../middleware";
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

houseRouter.patch("/:id", tokenMiddleware, updateOneHouse);

// uploadMiddleware is the reusable bit. Add specific key we're expecting.
houseRouter.post(
  "/",
  tokenMiddleware,
  uploadMiddleware.array("pictures"),
  createOneHouse
);

houseRouter.delete("/:id", deleteHouseById);

export default houseRouter;
