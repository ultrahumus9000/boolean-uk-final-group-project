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

// {
//   "id": 1,
//   "name": "Assistant Avon teal Swiss",
//   "bedrooms": 2,
//   "maxGuests": 4,
//   "facility": [
//     "Wifi",
//     "Jacuzzi",
//     "Parking",
//     "Kitchen"
//   ],
//   "city": "Salina",
//   "hostProfile": "Aliya.Schulist63anet",
//   "price": 87,
//   "reviews": [],
//   "pictures": [
//     {
//       "src": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       "alt": "whole house"
//     },
//     {
//       "src": "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       "alt": "bedroom"
//     },
//     {
//       "src": "https://images.pexels.com/photos/892618/pexels-photo-892618.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       "alt": "living room"
//     },
//     {
//       "src": "https://images.pexels.com/photos/3288104/pexels-photo-3288104.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       "alt": "bathroom"
//     },
//     {
//       "src": "https://images.pexels.com/photos/2208891/pexels-photo-2208891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       "alt": "kitchen"
//     }
//   ]
// },

type Picture = {
  src: string;
  alt: string;
};

type Review = {
  content: string;
  guestUsername: string;
};

type House = {
  id: number;
  name: string;
  bedrooms: number;
  maxGuests: number;
  facility: string[];
  city: string;
  hostProfile: string;
  price: 87;
  pictures: Picture[];
  reviews: {};
};
type Store = {
  houses: House[];
  currentUser: User;
  setCurrentUser: (arg: User) => void;
  fetchAllHouses: () => void;
};

const useStore = create<Store>((set) => ({
  houses: [],
  currentUser: {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    role: "",
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
}));

export default useStore;
