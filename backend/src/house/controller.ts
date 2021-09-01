import { Request, Response } from "express";
import db from "../database";

const { house } = db;

async function getAllHouses(req: Request, res: Response) {
  try {
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
    });

    const firstModifiedData = rawData.map((house) => {
      let hostUsername = house.hostProfile.user.username;

      let filteredReviews = house.reviews.map((review) => {
        let modifedReview = {
          content: review.content,
          guestUsername: review.guestProfile.user.username,
        };
        return modifedReview;
      });

      let modifiedHouse = {
        ...house,
        hostProfile: hostUsername,
        reviews: filteredReviews,
      };
      return modifiedHouse;
    });

    //housesWithHostAndReviews
    res.json(firstModifiedData);
  } catch (error) {
    res.json(error);
  }
}

async function deleteHouseById(req: Request, res: Response) {
  const houseId = Number(req.params.id);
  try {
    await house.delete({
      where: {
        id: houseId,
      },
    });
    res.json("this house of listing is deleted ");
  } catch (error) {
    res.json(error);
  }
}

export { getAllHouses, deleteHouseById };
