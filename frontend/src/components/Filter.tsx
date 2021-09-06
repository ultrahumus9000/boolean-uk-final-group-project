// import React, { useState } from "react"
import * as React from "react"
import { useState, SyntheticEvent } from "react"
import useStore from "../store"

export default function Filter() {
  const filterHouses = useStore(store => store.filterHouses)
  const initialOptions = {
    city: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  }

  const [filterOptions, setFilterOptions] = useState(initialOptions)

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

  function clearForm() {
    setFilterOptions(initialOptions)
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
      <label>
        Guests
        <input
          type="number"
          name="maxGuests"
          value={filterOptions.maxGuests}
          min="1"
          onChange={handleChange}
        />
      </label>
      <label>
        Check In
        <input
          id="checkInCal"
          type="date"
          name="checkIn"
          value={filterOptions.checkIn}
          min={filterOptions.checkIn}
          onChange={handleChange}
        />
      </label>
      <label>
        Check Out
        <input
          type="date"
          name="checkOut"
          value={filterOptions.checkOut}
          max={"2024-01-01"}
          onChange={handleChange}
        />
      </label>

      <input type="submit" value="Search" />
      <button onClick={clearForm}>Reset</button>
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
