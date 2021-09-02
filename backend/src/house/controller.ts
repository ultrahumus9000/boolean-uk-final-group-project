import { Request, Response } from "express";
import db from "../database";

const { house } = db;

// `http://localhost:4000/houses/filterBy?location=${location}&checkIn=${checkIn}checkOut=${checkOut}&maxGuests=${maxGuests}`
// const { city, checkIn, checkOut, maxGuests } = filterOptions

async function getFilteredHouses(req: Request, res: Response) {
  let { city, checkIn, checkOut, maxGuests } = req.query;

  try {
    const filteredHouses = await house.findMany({
      where: {
        maxGuests: { gte: parseInt(maxGuests as string) },
        city: { contains: city as string },
        bookings: {
          some: {
            start: new Date(checkIn as string).toISOString(),
            end: new Date(checkOut as string).toISOString(),
          },
        },
      },
    });

    console.log("req.query is:", req.query);
    res.json({ filteredHouses });
  } catch (error) {
    res.json(error);
  }
}

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
