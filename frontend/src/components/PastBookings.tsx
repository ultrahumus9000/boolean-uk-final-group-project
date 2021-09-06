import React from "react"
import { Button } from "@material-ui/core"

export default function PastBookings({ userBookings }) {

   console.log("userBookings", userBookings)
   return (
      <>
         {
            userBookings.map((booking) =>
               <div className="stay-container">
                  <img src="#"></img>
                  <div className="stay-details">
                     <div className="hotelName">
                        <p className="stay-title">{booking.name}</p>
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