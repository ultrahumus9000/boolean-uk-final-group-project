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

export { getAllHouses };
//   id          Int         @id @default(autoincrement())
//   name        String
//   bedrooms    Int
//   maxGuests   Int
//   facility    String[]
//   city        String
//   wishList    WishList[]
//   hostProfile HostProfile @relation(fields: [hostId], references: [id], onDelete: Cascade)
//   hostId      Int
//   price       Int
//   reviews     Review[]
//   pictures    Picture[]
//   bookings    Booking[]
