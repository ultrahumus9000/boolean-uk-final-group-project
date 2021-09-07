import React from "react"
import { Button } from "@material-ui/core"

export default function PastBookings({ bookings }) {

   console.log("userBookings", bookings)
   return (
      <>
         {
            bookings.map((booking) =>
               <div className="stay-container">
                  <img src={booking.avatar}></img>
                  <div className="stay-details">
                     <div className="hotelName">
                        <p className="stay-title">{booking.house}</p>
                        <p>{booking.start}-{booking.end}</p>
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