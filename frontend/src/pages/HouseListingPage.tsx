import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore, { House } from "../store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import Balcony from "../assets/Balcony.svg";

type HouseIdType = {
  houseId: string;
};

export default function HouseListingPage() {
  const houseId: HouseIdType = useParams();
  const realHouseId = Number(houseId.houseId);
  const house = useStore((store) => store.house);
  const fetchOneHouse = useStore((store) => store.fetchOneHouse);

  useEffect(() => {
    fetchOneHouse(realHouseId);
  }, [realHouseId]);

  if (Object.keys(house).length === 0) {
    return <h1>we are loading for you</h1>;
  }

  return (
    <div className="house-card">
      <section className="house-bio">
        <h2>{house.name}</h2>
        <section className="basic-section">
          <div className="address-div">
            <img className="facility-icon" src={Balcony} />
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
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination
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
      <p className="facility-p"> Provided Facilities</p>
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

      <button className="book-btn" onClick={() => {}}>
        {" "}
        Book Today
      </button>
      <p>
        Check our reviews
        <button className="review-btn">Click to see more</button>
      </p>

      <section></section>
    </div>
  );
}
