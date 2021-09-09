import React from "react";
import { Button } from "@material-ui/core";
import useStore from "../store";

export default function BookingList({ bookings }) {
  const currentUser = useStore((store) => store.currentUser);

  const toggleBooking = useStore((store) => store.toggleBooking);

  function deleteBooking() {}

  return (
    <>
      {currentUser.role === "host" ? (
        <div>
          {bookings.map((booking) => (
            <div className="stay-container">
              <img src={booking.pictureSrc}></img>
              <div className="stay-details">
                <div className="hotelName">
                  <p className="stay-title">{booking.houseName}</p>
                  <p>
                    {booking.start.slice(2, 10)}-{booking.end.slice(2, 10)}{" "}
                  </p>
                </div>

                {toggleBooking === "future" ? (
                  <div className="contact-host">
                    <Button> Contact Guest</Button>
                    <button onClick={deleteBooking}>X</button>
                  </div>
                ) : (
                  <Button> Leave review</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {bookings.map((booking) => (
            <div className="stay-container">
              <img src={booking.pictureSrc}></img>
              <div className="stay-details">
                <div className="hotelName">
                  <p className="stay-title">{booking.houseName}</p>
                  <p>
                    {booking.start.slice(2, 10)} - {booking.end.slice(2, 10)}{" "}
                  </p>
                </div>
                {toggleBooking === "future" ? (
                  <div className="contact-host">
                    <Button variant="contained" color="secondary">
                      {" "}
                      Contact Host
                    </Button>
                    <p onClick={deleteBooking}>Xhahahahah</p>
                  </div>
                ) : (
                  <Button variant="contained" color="secondary">
                    {" "}
                    Leave review
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
