import { Request, Response } from "express"
import db from "../database"
import { getFilteredHouses, modifiedHouses } from "./service"
import { Query } from "./service"

const { house, review, user, guestProfile } = db

async function getAllHouses(req: Request, res: Response) {
  try {
    if (Object.keys(req.query).length) {
      const rawData = await getFilteredHouses(req.query as Query)
      const houses = await modifiedHouses(rawData)
      res.json(houses)
    } else {
      const rawData = await house.findMany({
        select: {
          id: true,
          name: true,
          bedrooms: true,
          maxGuests: true,
          facility: true,
          city: true,
          hostProfile: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },

          price: true,
          reviews: {
            select: {
              content: true,
              guestProfile: {
                select: {
                  user: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          },
          pictures: {
            select: {
              src: true,
              alt: true,
            },
          },
        },
      })

      const houses = await modifiedHouses(rawData)
      console.log("rawData", rawData)
      console.log("houses", houses)
      res.json(houses)
    }
  } catch (error) {
    res.json(error)
  }
}

async function deleteHouseById(req: Request, res: Response) {
  const houseId = Number(req.params.id)
  try {
    await house.delete({
      where: {
        id: houseId,
      },
    })
    res.json("this house of listing is deleted ")
  } catch (error) {
    res.json(error)
  }
}

export { getAllHouses, deleteHouseById }
