import React, { useState, useEffect, SyntheticEvent } from "react"
import Facility from "../components/Facility"
import { NewHouse } from "../store"

export default function addListingHost() {
  // const currentUser = useStore((state) => state.currentUser);
  const initialHouseData = {
    name: "",
    city: "",
    pictures: [],
    bedrooms: 1,
    maxGuests: 1,
    facility: [],
    price: 0,
  }

  const facilitiesList = {
    bedroom: "bedroom",
    maxGuests: "maxGuests",
    balcony: "balcony",
    bathtub: "bathtub",
    bidet: "bidet",
    garden: "garden",
    jacuzzi: "jacuzzi",
    kitchen: "kitchen",
    parking: "parking",
    shower: "shower",
    spa: "spa",
    swimmingPool: "swimmingPool",
    tv: "tv",
    wifi: "wifi",
  }

  const [picturesArray, setPicturesArray] = useState([])
  const [newListing, setNewListing] = useState(initialHouseData)

  function handleChange(e) {
    console.log(e.target.value)
    setNewListing({
      ...newListing,
      [e.target.name]: e.target.value,
    })
  }

  function handleChangeFacility(e) {
    const updatedArray = e.target.checked
      ? [...newListing[e.target.name], e.target.value]
      : newListing[e.target.name].filter(
          facility => facility !== e.target.value
        )

    setNewListing({ ...newListing, [e.target.name]: updatedArray })
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    addNewListing(newListing)
  }

  function addNewListing(housedata: NewHouse) {
    console.log("housedata", housedata)
    // fetch(`${baseUrl}/houses`, {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(housedata),
    // })
    // .then(resp => resp.json())
    // .then(newHouse => {
    //   set({ houses: {...houses, newHouse} })
    //   console.log("newHouse", newHouse)
    // })
    // .catch(error => {
    //   throw error
    // })
  }

  return (
    <div>
      <h2>Add new listing</h2>
      <form className="addListingForm" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" type="text" onChange={handleChange} />
        </label>
        <label>
          City
          <input name="city" type="text" onChange={handleChange} />
        </label>
        <label>
          Photos
          <input name="pictures" type="file" accept="image/*" multiple />
          <ul>
            {picturesArray.map(picture => (
              <li>
                <p>{picture}</p>
                {/* <button onClick={delPhoto}>✖</button> */}
              </li>
            ))}
          </ul>
        </label>
        <label>
          Bedrooms
          <input name="bedroom" type="number" value={newListing.bedrooms} />
        </label>
        <label>
          Maximum No. Guests
          <input name="maxGuests" type="number" value={newListing.maxGuests} />
        </label>
        <label>
          Facilities
          <ul>
            <Facility
              options={facilitiesList}
              handleChangeFacility={handleChangeFacility}
              newListing={newListing}
            />
          </ul>
        </label>
        <label>
          Price per Night
          <input type="number" value={newListing.price} min="0" step="10.0" />
        </label>
        <span className="validity"></span>
        <input type="submit" value="Add listing" />
      </form>
    </div>
  )
}

// input:invalid+span:after {
//   content: '✖';
//   padding-left: 5px;
// }

// input:valid+span:after {
//   content: '✓';
//   padding-left: 5px;
// }
