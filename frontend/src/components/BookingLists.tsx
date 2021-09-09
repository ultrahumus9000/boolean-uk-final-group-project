import React, { useState } from "react";
import { Button } from "@material-ui/core";
import useStore from "../store";
import ReviewForm from "./ReviewForm";
import { useHistory } from "react-router";

export default function BookingList({ bookings }) {
  const currentUser = useStore((store) => store.currentUser);
  const history = useHistory();
  const toggleBooking = useStore((store) => store.toggleBooking);

  const [addReviewStatus, setAddReviewStatus] = useState(false);

  function deleteBooking() {}

  function toggleReview() {
    setAddReviewStatus(!addReviewStatus);
  }
  console.log(addReviewStatus);

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
            <div
              className="stay-container"
              onClick={() => {
                history.push(`/house/${booking.house.id}`);
              }}
            >
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
                    <Button> Contact Host</Button>
                    <button onClick={deleteBooking}>X</button>
                  </div>
                ) : addReviewStatus ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggleReview}
                  >
                    {" "}
                    Leave review
                  </Button>
                ) : (
                  <ReviewForm toggleReview={toggleReview} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
