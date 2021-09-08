import React, { SyntheticEvent, useEffect } from "react"
import useStore from "../store"
import Filter from "../components/Filter"
import HouseCard from "../components/HouseCard"

export default function HomePage() {
  const housesArray = useStore(store => store.houses)
  const fetchAllHouses = useStore(store => store.fetchAllHouses)

  useEffect(() => {
    fetchAllHouses()
  }, [])

  if (housesArray.length === 0) {
    return <h1> we are loading for you </h1>
  }
<<<<<<< HEAD
  console.log("housesArray in home", housesArray)
=======

>>>>>>> commit
  return (
    <div className="main">
      <Filter />
      <div className="houses-section">
<<<<<<< HEAD
        {housesArray.map(house => (
=======
        {/* {housesArray.map(house => (
>>>>>>> commit
          <HouseCard
            key={house.id}
            image={house.pictures[0]}
            name={house.name}
            city={house.city}
            price={house.price}
            houseId={house.id}
          />
<<<<<<< HEAD
        ))}
=======
        ))} */}
>>>>>>> commit
      </div>
    </div>
  )
}
