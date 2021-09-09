import React from "react"
import { Button } from "@material-ui/core"
import useStore from "../store";

export default function FutureBookings({ bookings }) {
   const deleteBooking = useStore((state) => state.deleteBooking);
   const currentUser = useStore((state) => state.currentUser)

   console.log(currentUser)
   return (
      <div className="stay-container">
         <img src="#"></img>
         <div className="stay-details">
            <div className="hotelName">
               <p className="stay-title">Future Name</p>
               <p> 1-3st Sep</p>
            </div>
            <div className="contact-host">
               <Button> Contact host</Button>
               {/* <p onClick={() => deleteBooking(currentUser.id} > X </p> */}
            </div>
         </div>
      </div>
   )
}
