import React, { useEffect } from "react"
import useStore from "../store"
import Filter from "../components/Filter"
import HouseCard from "../components/HouseCard"

export default function HomePage() {
  const housesArray = useStore(store => store.houses)
  const fetchAllHouses = useStore(store => store.fetchAllHouses)

  // const housesArray = [
  //   {
  //     id: 1,
  //     name: "Nice House",
  //     pictures: [{ src: "#", alt: "whole house" }],
  //     city: "Amsterdam",
  //     price: 522,
  //   },
  //   {
  //     id: 2,
  //     name: "Fancy House",
  //     pictures: [{ src: "#", alt: "whole house" }],
  //     city: "London",
  //     price: 3222,
  //   },
  //   {
  //     id: 3,
  //     name: "Rubbish House",
  //     pictures: [{ src: "#", alt: "whole house" }],
  //     city: "Manchester",
  //     price: 122,
  //   },
  //   {
  //     id: 4,
  //     name: "Posh House",
  //     pictures: [{ src: "#", alt: "whole house" }],
  //     city: "Paris",
  //     price: 1222,
  //   },
  // ]

  useEffect(() => {
    fetchAllHouses()
  })
  return (
    <div className="main">
      <Filter />
      <div className="houses-section">
        {housesArray.map(house => (
          <HouseCard
            key={house.id}
            image={house.pictures[0]}
            name={house.name}
            city={house.city}
            price={house.price}
          />
        ))}
      </div>
    </div>
  )
}
