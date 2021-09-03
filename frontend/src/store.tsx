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

type Review = {
  content: string;
  guestUsername: string;
  guestAvatar: string;
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
type Store = {
  houses: House[];
  house: House;
  currentUser: User;
  reviewDisplay: boolean;
  setReviewDisplay: () => void;
  setCurrentUser: (arg: User) => void;
  fetchAllHouses: () => void;
  fetchOneHouse: (arg: number) => void;
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
  reviewDisplay: false,
  setReviewDisplay: () => {
    set({ reviewDisplay: !get().reviewDisplay });
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
}));

export default useStore;
