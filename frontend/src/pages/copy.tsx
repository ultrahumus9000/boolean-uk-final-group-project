import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore, { House } from "../store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/bundle";

type HouseIdType = {
  houseId: string;
};

export default function HouseListingPage() {
  const houseId: HouseIdType = useParams();
  const realHouseId = Number(houseId.houseId);
  const house = useStore((store) => store.house);
  const fetchOneHouse = useStore((store) => store.fetchOneHouse);
  const reviewDisplay = useStore((store) => store.reviewDisplay);
  const setReviewDisplay = useStore((store) => store.setReviewDisplay);

  useEffect(() => {
    fetchOneHouse(realHouseId);
  }, [realHouseId]);

  if (Object.keys(house).length === 0) {
    return <h1>we are loading for you</h1>;
  }

  function toggleReviewDisplay() {
    setReviewDisplay;
  }

  return (
    <div className="house-card">
      <section className="house-bio">
        <h2>{house.name}</h2>
        <section className="basic-section">
          <div className="address-div">
            <img
              className="facility-icon"
              src="https://images.pexels.com/photos/3227634/pexels-photo-3227634.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            />
            <span>{house.city}</span>
            <span>£{house.price}</span>
          </div>
          <div className="house-basic-div">
            <span>Guests: {house.maxGuests}</span>
            <span>Bedrooms: {house.bedrooms}</span>
          </div>
          <div className="host-div">
            <img src={house.hostAvatar} className="host-profile" />
            <span>{house.hostProfile}</span>
          </div>
        </section>
      </section>

      <section className="pictures-section">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(swiper) => {
            console.log(swiper);
          }}
        >
          {house.pictures.map((picture) => {
            return (
              <SwiperSlide key={picture.alt}>
                <img src={picture.src} alt={picture.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <p> Provided Facilities</p>
      <section className="facility-section">
        {house.facility.map((facility) => {
          return (
            <p className="facility" key={facility}>
              <img
                className="facility-icon"
                src="https://images.pexels.com/photos/1028379/pexels-photo-1028379.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              />
              <span>{facility}</span>
            </p>
          );
        })}
      </section>
    </div>
  );
}
