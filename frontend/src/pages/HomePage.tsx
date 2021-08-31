import React, {useEffect} from "react"
import useStore from "../store"
import Filter from "../components/Filter"
import HouseCard from "../components/HouseCard"

export default function HomePage(){
const housesArray = useStore(store => store.houses)
const fetchAllHouses = useStore(store => store.fetchAllHouses)

// useEffect(() => {
//    fetchAllHouses()
// })
   return   (
   <div className="main">
   <Filter/>
   <div className="houses-section">
      {housesArray.map(house => <HouseCard/> )}
      <HouseCard/>
      <HouseCard/>
   </div>
   </div>
   )
}