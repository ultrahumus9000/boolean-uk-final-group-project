import React, { useState, useEffect } from "react"
import FutureBookings from "./FutureBookings"
import PastBookings from "./PastBookings"
import { Link } from "react-router-dom"
import useStore from "../store"

// This component can be used for both host and guest. If not, add another tho!

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [toggleBooking, setToggleBooking] = useState(false)
  const currentUser = useStore(state => state.currentUser)

  // get all booking for host when host is login

  //get bookings for specific guest when guest role is loggedin

  //   if(role is guest){
  //      do get bookings for guest only
  //   }
  function getBookings() {
    fetch("http://localhost:4000/bookings/user", {
      credentials: "include",
    })
      .then(resp => resp.json())
      .then(resp => {
        setBookings(resp)
        console.log(resp)
      })
      .then(resp => resp.json())
      .then(resp => {
        setBookings(resp)
      })
      .catch(error => {
        console.error("Unable to fetch all bookings", error)
      })
  }

  useEffect(() => {
    getBookings()
  }, [])

  // let bookings = [];
  // console.log("Guest Bookings:", bookings[0].guestProfile.name)
  console.log("Bookings", bookings)

  // if (!bookings.length) {
  //    return <h1>we are loading for you</h1>;
  // } else {
  //    const bookings = bookings.filter(
  //       booking => booking.guestProfile.name === currentUser.username)
  // }

  console.log(bookings)

  return (
    <>
      <div className="profile">
        <img className="profile-avatar" src={currentUser.avatar} alt="avatar" />
        <h1>Hello {currentUser.username}!</h1>
        <Link to="/guest/profile">
          <button className="go-profile">Go to profile</button>
        </Link>
        {currentUser.role === "host" ? (
          <Link to="/host/dashboard/addlisting">
            <button className="go-profile">Go to profile</button>
          </Link>
        ) : null}
      </div>
      <div className="bookings">
        <h2> Bookings</h2>
        {/* <div className= */}
        <div onClick={() => setToggleBooking(!toggleBooking)}> Future</div>
        <div onClick={() => setToggleBooking(!toggleBooking)}> Past</div>
        {toggleBooking && <FutureBookings bookings={bookings} />}
        {!toggleBooking && <PastBookings bookings={bookings} />}
      </div>
    </>
  )
}
