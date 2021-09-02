import { Router } from "express"
import { getAllHouses, getFilteredHouses } from "./controller"

const houseRouter = Router()

houseRouter.get("/", getAllHouses)
houseRouter.get("/filterBy", getFilteredHouses)

export default houseRouter
