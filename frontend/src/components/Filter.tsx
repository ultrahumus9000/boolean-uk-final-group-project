// import React, { useState } from "react"
import * as React from "react"
import { useState } from "react"
export default function Filter() {
  function makeDate(newDate: Date) {
    // this function turns a long date into "2021-8-1" format.
    const [newDateYear, newDateMonth, newDateDay] = [
      newDate.getFullYear(),
      newDate.getMonth().toFixed(2),
      newDate.getDate().toFixed(2),
    ]
    const currentDate = `${newDateYear}-${newDateMonth}-${newDateDay}`
    return currentDate
  }

  const currentDate = makeDate(new Date())

  const [location, setLocation] = useState("")
  const [dateFrom, setDateFrom] = useState(currentDate)
  const [dateTo, setDateTo] = useState("2024-01-01")
  const [maxGuests, setMaxGuests] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
    filterHouses()
    console.log("submit clicked")
  }

  function filterHouses() {
    const data = {
      location: location,
      dateFrom: dateFrom,
      dateTo: dateTo,
      maxGuests: maxGuests,
    }
    console.log("data filter", data)
    // fetch(`${baseUrl}/houses?location=${location}&dateRange=${dateRange}&guests=${guests}`)
  }

  function handleLocationChange(e) {
    e.preventDefault()
    setLocation(e.target.value)
  }

  function handleDateFromChange(e) {
    let dateFrom = makeDate(e.target.value)
    setDateFrom(dateFrom)
    console.log("newDateFrom", dateFrom)
  }

  function handleDateToChange(e) {
    let dateTo = makeDate(e.target.value)
    setDateTo(dateTo)
    console.log("newDateTo", dateTo)
  }

  function handleMaxGuestsChange(e) {
    setMaxGuests(e.target.maxGuests.value)
  }

  return (
    <form className="filter" onSubmit={handleSubmit}>
      <input
        type="search"
        name="location"
        placeholder="Where to?"
        onChange={handleLocationChange}
        value={location}
      />
      <input
        type="date"
        name="dateFrom"
        value={dateFrom}
        min={dateFrom}
        onChange={handleDateFromChange}
      />
      <input
        type="date"
        name="dateTo"
        value="null"
        max={dateTo}
        onChange={handleDateToChange}
      />
      <input
        type="number"
        name="maxGuests"
        value={maxGuests}
        min="1"
        onChange={handleMaxGuestsChange}
      />
      <input type="submit" />
    </form>
  )
}
