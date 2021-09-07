import React from "react"
import { Button } from "@material-ui/core"

export default function FutureBookings({ bookings }) {
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
               <p>X</p>
            </div>
         </div>
      </div>
   )
}