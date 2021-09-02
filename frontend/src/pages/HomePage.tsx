import React, { useEffect } from "react";
import useStore from "../store";
import Filter from "../components/Filter";
import HouseCard from "../components/HouseCard";

export default function HomePage() {
  const housesArray = useStore((store) => store.houses);
  const fetchAllHouses = useStore((store) => store.fetchAllHouses);


    fetchAllHouses();
  }, [housesArray.length]);

  return (
    <div className="main">
      <Filter />
      {/* <div className="houses-section">
        {housesArray.map((house) => (
          <HouseCard
            key={house.id}
            image={house.pictures[0]}
            name={house.name}
            city={house.city}
            price={house.price}
          />
        ))}
      </div> */}
    </div>
  );
}
