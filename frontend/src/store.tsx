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

type Store = {
  houses: {}[];
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
