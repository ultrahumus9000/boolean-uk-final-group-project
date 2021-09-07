import React, { useState, useEffect } from "react";
import FutureBookings from "./FutureBookings";
import PastBookings from "./PastBookings";
import { Link } from "react-router-dom";
import useStore from "../store";

// This component can be used for both host and guest. If not, add another tho!

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const toggleBooking = useStore((store) => store.toggleBooking);
  const setToggleBooking = useStore((store) => store.setToggleBooking);
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

  const today = new Date().toISOString();

  const futureBookings = bookings.filter((booking) => booking.start >= today);

  const pastBookings = bookings.filter((booking) => booking.start < today);

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
          <div
            onClick={() => setToggleBooking("future")}
            className={`${toggleBooking === "future" ? "active" : null}`}
          >
            {" "}
            Future
          </div>
          <div
            className={`${toggleBooking === "past" ? "active" : null}`}
            onClick={() => setToggleBooking("past")}
          >
            {" "}
            Past
          </div>
        </div>
        {toggleBooking === "future" && (
          <FutureBookings bookings={futureBookings} />
        )}
        {toggleBooking === "past" && <PastBookings bookings={pastBookings} />}
      </div>
    </>
  );
}
