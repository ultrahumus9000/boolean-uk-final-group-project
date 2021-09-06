import React from "react"
import { Button } from "@material-ui/core"

export default function PastBookings({ bookings }) {

   return (
      <>
         {
            bookings.map((booking) =>
               <div className="stay-container">
                  <img src={booking.house.hostAvatar}></img>
                  <div className="stay-details">
                     <div className="hotelName">
                        <p className="stay-title">{booking.house.name}</p>
                        <p> 1-3st Sep</p>
                     </div>
                     <div className="contact-host">
                        <Button> Leave review</Button>
                     </div>
                  </div>
               </div>
            )
         }
      </>
   )
}