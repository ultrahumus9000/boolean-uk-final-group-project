import React, { useState, useEffect } from "react";
import FutureBookings from "./FutureBookings";
import PastBookings from "./PastBookings";
import { Link } from "react-router-dom";
import useStore from "../store";

// This component can be used for both host and guest. If not, add another tho!

export default function Dashboard() {
   const [bookings, setBookings] = useState([]);
   const [toggleBooking, setToggleBooking] = useState(false)
   const currentUser = useStore((state) => state.currentUser);


   function getBookings() {
      fetch("http://localhost:4000/bookings", {
         credentials: "include",
      })
         .then((resp) => resp.json())
         .then((resp) => setBookings(resp))
         .catch((error) => {
            console.error("Unable to fetch all bookings", error);
         })
   }

   useEffect(() => {
      getBookings()
   }, []);

   console.log(bookings)

   if (!bookings.length) {
      return <h1>we are loading for you</h1>;
   } else {
      const userBookings = bookings.find(
         booking => booking.guestProfile.user.username = currentUser.username)
   }

   console.log(userBookings)

   return (
      <>
         <div className="profile">
            <img
               className="profile-avatar"
               src="data:image/jpeg;base64,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"
               alt="avatar"
            />
            <h1>Hello (name)!</h1>
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
            {toggleBooking && <FutureBookings />}
            {!toggleBooking && <PastBookings />}



         </div>
      </>
   );
}
