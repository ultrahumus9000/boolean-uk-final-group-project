import create from "zustand"

let baseUrl = "http://localhost:4000"

type Store = {
  houses: {}[]
  fetchAllHouses: () => void
}

const useStore = create<Store>(set => ({
  houses: [],
  fetchAllHouses: () => {
    fetch(`${baseUrl}/houses`)
      .then(resp => resp.json())
      .then(allHouses => {
        set({ houses: allHouses })
        console.log("All houses fetch", allHouses)
      })
      .catch(error => {
        console.error("Unable to fetch all houses", error)
      })
  },
}))

export default useStore
