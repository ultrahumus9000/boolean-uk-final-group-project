import create from "zustand"

let baseUrl = "http://localhost:4000"

type User = {
  username: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
}

type Picture = {
  src: string
  alt: string
}

type Review = {
  content: string
  guestUsername: string
}

export type House = {
  id: number
  name: string
  bedrooms: number
  maxGuests: number
  facility: string[]
  city: string
  hostProfile: string
  price: number
  pictures: Picture[]
  reviews: Review[]
}

type Options = {
  city: string
  checkIn: string
  checkOut: string
  maxGuests: number
}

type Store = {
  houses: House[]
  currentUser: User
  setCurrentUser: (arg: User) => void
  fetchAllHouses: () => void
  filterHouses: (arg: Options) => void
}

const useStore = create<Store>(set => ({
  houses: [],
  currentUser: {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    role: "",
  },
  setCurrentUser: userFromServer => {
    set({
      currentUser: userFromServer,
    })
  },
  fetchAllHouses: () => {
    fetch(`${baseUrl}/houses`)
      .then(resp => resp.json())
      .then(allHouses => {
        set({ houses: allHouses })
      })
      .catch(error => {
        console.error("Unable to fetch all houses", error)
      })
  },
  filterHouses: filterOptions => {
    let { city, checkIn, checkOut, maxGuests } = filterOptions
    console.log("data filter", filterOptions)
    const cityFilter = city !== "" ? `city=${city}&` : ""
    checkIn = checkIn !== "" ? checkIn : new Date().toISOString()
    checkOut = checkOut !== "" ? checkOut : new Date(2025, 1, 1).toISOString()
    fetch(
      `${baseUrl}/houses?${cityFilter}checkIn=${checkIn}&checkOut=${checkOut}&maxGuests=${maxGuests}`
    )
      .then(resp => resp.json())
      .then(allHouses => {
        set({ houses: allHouses })
        console.log("All houses fetch", allHouses)
      })
      .catch(error => {
        throw error
      })
  },
}))

export default useStore
