import React, { useState, useEffect } from "react";
import FutureBookings from "./FutureBookings";
import PastBookings from "./PastBookings";
import { Link } from "react-router-dom";
import useStore from "../store";

// This component can be used for both host and guest. If not, add another tho!

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [toggleBooking, setToggleBooking] = useState(false);
  const currentUser = useStore((state) => state.currentUser);

  function getBookings() {
    fetch("http://localhost:4000/bookings/user", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.error("Unable to fetch all bookings", error);
      });
  }

  useEffect(() => {
    getBookings();
  }, []);

  let userBookings = [];
  // console.log("Guest Bookings:", bookings[0].guestProfile.name)
  console.log("Current user:", currentUser.username);

  if (!bookings.length) {
    return <h1>we are loading for you</h1>;
  } else {
    // const userBookings = bookings.filter(
    //    booking => booking.guestProfile.name === currentUser.username)
  }

  console.log(userBookings);

  return (
    <>
      <div className="profile">
        <img className="profile-avatar" src={currentUser.avatar} alt="avatar" />
        <h1>Hello {currentUser.username}!</h1>
        <Link to="/guest/profile">
          <button className="go-profile">Go to profile</button>
        </Link>
        {/* if role=host then add listing */}
      </div>
      <div className="bookings">
        <h2> Bookings</h2>
        {/* <div className= */}
        <div onClick={() => setToggleBooking(!toggleBooking)}> Future</div>
        <div onClick={() => setToggleBooking(!toggleBooking)}> Past</div>
        {/* {toggleBooking && <FutureBookings userBookings={userBookings} />}
        {!toggleBooking && <PastBookings userBookings={userBookings} />} */}
      </div>
    </>
  );
}
