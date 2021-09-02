
import { Router } from "express"
import { getAllHouses, getFilteredHouses,deleteHouseById } from "./controller"

const houseRouter = Router()


houseRouter.get("/", getAllHouses)
houseRouter.get("/filterBy", getFilteredHouses)


houseRouter.delete("/:id", deleteHouseById);


export default houseRouter
