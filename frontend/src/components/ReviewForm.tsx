import React, { useState } from "react";
import useStore, { Review } from "../store";

export default function ReviewForm({ toggleReview }) {
  // need to create form to do it and backend already set up
  //   reviews

  return (
    <>
      <form>
        <input />
        <button type="submit">Confirm</button>
        <button type="button" onClick={toggleReview}>
          Cancel
        </button>
      </form>
    </>
  );
}
