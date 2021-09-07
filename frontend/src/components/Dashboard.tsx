import React, { useState, useEffect } from "react";
import FutureBookings from "./FutureBookings";
import PastBookings from "./PastBookings";
import { Link } from "react-router-dom";
import useStore from "../store";

// This component can be used for both host and guest. If not, add another tho!

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [toggleBooking, setToggleBooking] = useState(true);
  const currentUser = useStore((state) => state.currentUser);

  function getBookingsForHost() {
    fetch("http://localhost:4000/bookings/host", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setBookings(resp);
      })
      .catch((error) => {
        console.error("Unable to fetch all bookings", error);
      });
  }
  function getBookingsForGuest() {
    fetch("http://localhost:4000/bookings/guest", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setBookings(resp);
      })
      .catch((error) => {
        console.error("Unable to fetch all bookings", error);
      });
  }

  useEffect(() => {
    if (currentUser.role === "guest") {
      getBookingsForGuest();
    } else if (currentUser.role === "host") {
      getBookingsForHost();
    }
  }, []);

  console.log("guest bookings", bookings);

  const today = new Date().toISOString();
  console.log(today);
  const futureBookings = bookings.filter((booking) => booking);

  const pastBookings = [];

  return (
    <>
      <div className="profile">
        <img className="profile-avatar" src={currentUser.avatar} alt="avatar" />
        <h1>Hello {currentUser.username}!</h1>

        <button className="go-profile">Go to profile</button>

        {currentUser.role === "host" && (
          <button className="go-profile">Add a listing</button>
        )}

        {/* if role=host then add listing */}
      </div>
      <div className="bookings">
        <h2> Bookings</h2>
        <div className="bookings-title">
          <div onClick={() => setToggleBooking(!toggleBooking)}> Future</div>
          <div onClick={() => setToggleBooking(!toggleBooking)}> Past</div>
        </div>
        {!toggleBooking && <FutureBookings bookings={bookings} />}
        {toggleBooking && <PastBookings bookings={bookings} />}
      </div>
    </>
  );
}
