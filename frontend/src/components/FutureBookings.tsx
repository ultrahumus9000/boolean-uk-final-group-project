import React from "react";
import { Button } from "@material-ui/core";
import BookingList from "./BookingLists";

export default function FutureBookings({ bookings }) {
  return (
    <>
      <BookingList bookings={bookings} />
    </>
  );
}
