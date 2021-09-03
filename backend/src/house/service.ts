import { Request, Response } from "express"
import db from "../database"

const { house } = db

export type Query = {
  city?: string
  checkIn: string
  checkOut: string
  maxGuests: string
}

type Picture = {
  src: string
  alt: string
}

type Review = {
  content: string
  guestProfile: {
    user: {
      username: string
    }
  }
}

type User = {
  username: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
}

type HouseType = {
  id: number
  name: string
  bedrooms: number
  maxGuests: number
  facility: string[]
  city: string
  hostProfile: {
    user: {
      username: string
    }
  }
  price: number
  pictures: Picture[]
  reviews: Review[]
}

async function getFilteredHouses(query: Query) {
  let { city, checkIn, checkOut, maxGuests } = query

  try {
    const filteredHouses = await house.findMany({
      where: {
        maxGuests: { gte: parseInt(maxGuests) },
        city: { contains: city, mode: "insensitive" },
        //   bookings: {
        //     some: {
        //       start: new Date(checkIn).toISOString(),
        //       end: new Date(checkOut).toISOString(),
        //     },
        //   },
      },
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

    return filteredHouses
  } catch (error) {
    throw new Error()
  }
}

async function modifiedHouses(data: HouseType[]) {
  const firstModifiedData = data.map(house => {
    let hostUsername = house.hostProfile.user.username

    let filteredReviews = house.reviews.map(review => {
      let modifedReview = {
        content: review.content,
        guestUsername: review.guestProfile.user.username,
      }
      return modifedReview
    })

    let modifiedHouse = {
      ...house,
      hostProfile: hostUsername,
      reviews: filteredReviews,
    }
    return modifiedHouse
  })
  return firstModifiedData
}

export { getFilteredHouses, modifiedHouses }
