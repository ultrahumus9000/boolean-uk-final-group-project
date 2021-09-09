import create from "zustand";

let baseUrl = "http://localhost:4000";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
};

type Picture = {
  src: string;
  alt: string;
};

export type Review = {
  content: string;
  guestUsername: string;
  guestAvatar: string;
};

type Options = {
  city: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
};

export type House = {
  id: number;
  name: string;
  bedrooms: number;
  maxGuests: number;
  facility: string[];
  city: string;
  hostProfile: string;
  hostAvatar: string;
  price: number;
  pictures: Picture[];
  reviews: Review[];
};

type Booking = {
  id: number;
  name: string;
  bedrooms: number;
  maxGuests: number;
  facility: string[];
  city: string;
  hostProfile: string;
  hostAvatar: string;
  price: number;
  pictures: Picture[];
  reviews: Review[];
};

export type NewHouse = {
  name: string;
  bedrooms: number;
  maxGuests: number;
  facility: string[];
  city: string;
  price: number;
  pictures: Picture[];
};

type Store = {
  houses: House[];
  house: House;
  currentUser: User;
  bookingDisplay: Boolean;
  toggleBooking: string;
  setToggleBooking: (arg: string) => void;
  toggleDisplay: () => void;
  setCurrentUser: (arg: User) => void;
  fetchAllHouses: () => void;
  fetchOneHouse: (arg: number) => void;
  filterHouses: (arg: Options) => void;
  addNewListing: (arg: NewHouse) => void;
  getValidateCurrToken: () => void;
};

const useStore = create<Store>((set, get) => ({
  houses: [],
  house: {
    id: 0,
    name: "",
    bedrooms: 0,
    maxGuests: 0,
    facility: [],
    city: "",
    hostProfile: "",
    hostAvatar: "",
    price: 0,
    pictures: [],
    reviews: [],
  },
  currentUser: {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    role: "",
  },

  bookingDisplay: false,
  toggleBooking: "future",
  setToggleBooking: (arg) => {
    set({ toggleBooking: arg });
  },
  toggleDisplay: () => {
    set({ bookingDisplay: !get().bookingDisplay });
  },
  setCurrentUser: (userFromServer) => {
    set({
      currentUser: userFromServer,
    });
  },
  fetchAllHouses: () => {
    fetch(`${baseUrl}/houses`)
      .then((resp) => resp.json())
      .then((allHouses) => {
        set({ houses: allHouses });
      })
      .catch((error) => {
        console.error("Unable to fetch all houses", error);
      });
  },
  fetchOneHouse: (houseId) => {
    fetch(`${baseUrl}/houses/${houseId}`)
      .then((resp) => resp.json())
      .then((houseFromServer) => {
        console.log(houseFromServer);
        set({ house: houseFromServer });
      })
      .catch((error) => {
        console.error("Unable to fetch all houses", error);
      });
  },

  filterHouses: (filterOptions) => {
    let { city, checkIn, checkOut, maxGuests } = filterOptions;
    console.log("data filter", filterOptions);
    const cityFilter = city !== "" ? `city=${city}&` : "";
    checkIn = checkIn !== "" ? checkIn : new Date().toISOString();
    checkOut = checkOut !== "" ? checkOut : new Date(2025, 1, 1).toISOString();
    fetch(
      `${baseUrl}/houses?${cityFilter}checkIn=${checkIn}&checkOut=${checkOut}&maxGuests=${maxGuests}`
    )
      .then((resp) => resp.json())
      .then((allHouses) => {
        set({ houses: allHouses });
        console.log("All houses fetch", allHouses);
      })
      .catch((error) => {
        throw error;
      });
  },

  addNewListing: (housedata: NewHouse) => {
    console.log("housedata", housedata);
    fetch(`${baseUrl}/houses`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(housedata),
    })
      .then((resp) => resp.json())
      // .then(newHouse => {
      //   set({ houses: [...houses, newHouse] })
      //   console.log("newHouse", newHouse)
      // })
      .then((newHouse) => console.log("newHouse", newHouse))
      .catch((error) => {
        throw error;
      });
  },
  getValidateCurrToken: () => {
    fetch("http://localhost:4000/token", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((userToken) => {
        set({ currentUser: userToken });
      });
  },
}));

export default useStore;
//test
