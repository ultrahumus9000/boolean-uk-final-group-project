// import React, { useState } from "react"
import * as React from "react"
import { useState } from "react"
export default function Filter() {
  const [filterOptions, setFilterOptions] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  })

  function handleSubmit(e) {
    e.preventDefault()
    filterHouses()
    console.log("submit clicked")
  }

  function filterHouses() {
    let { city, checkIn, checkOut, maxGuests } = filterOptions
    console.log("data filter", filterOptions)
    const cityFilter = city !== "" ? `city=${city}&` : ""
    checkIn = checkIn !== "" ? checkIn : new Date().toString()
    checkOut = checkOut !== "" ? checkOut : new Date(2025, 1, 1).toString()
    console.log(
      "data filter if empty strings",
      city,
      checkIn,
      checkOut,
      maxGuests
    )
    fetch(
      `http://localhost:4000/houses?${cityFilter}checkIn=${checkIn}&checkOut=${checkOut}&maxGuests=${maxGuests}`
    )
      .then(resp => resp.json())
      .then(console.log)
      // .then(allHouses => {
      //   set({ houses: allHouses })
      //   console.log("All houses fetch", allHouses)
      // })
      .catch(error => {
        console.error("Unable to fetch all houses", error)
      })
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
