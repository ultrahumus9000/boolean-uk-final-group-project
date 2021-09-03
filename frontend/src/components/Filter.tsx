// import React, { useState } from "react"
import * as React from "react"
import { useState } from "react"
import useStore from "../store"

export default function Filter() {
  const filterHouses = useStore(store => store.filterHouses)

  const [filterOptions, setFilterOptions] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  })

  function handleSubmit(e) {
    e.preventDefault()
    filterHouses(filterOptions)
    console.log("submit clicked", filterOptions)
  }

  function handleChange(e) {
    console.log(e.target.value)
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className="filter" onSubmit={handleSubmit}>
      <input
        type="search"
        name="city"
        placeholder="Where to?"
        onChange={handleChange}
        value={filterOptions.city}
      />
      <input
        type="date"
        name="checkIn"
        value={filterOptions.checkIn}
        min={filterOptions.checkIn}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkOut"
        value={filterOptions.checkOut}
        max={"2024-01-01"}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxGuests"
        value={filterOptions.maxGuests}
        min="1"
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  )
}

// function makeDate(newDate: Date) {
//   // this function turns a long date into "2021-8-1" format.
//   const [newDateYear, newDateMonth, newDateDay] = [
//     newDate.getFullYear(),
//     newDate.getMonth().toFixed(2),
//     newDate.getDate().toFixed(2),
//   ]
//   const currentDate = `${newDateYear}-${newDateMonth}-${newDateDay}`
//   return currentDate
// }
