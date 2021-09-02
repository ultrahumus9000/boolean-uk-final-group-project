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
        <span>{house.city}</span>
        <span>{house.hostProfile}</span>
        <img src={house.hostAvatar} className="host-profile"></img>
      </section>

      <section className="pictures-section">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination
          onSlideChange={(swiper) => {
            console.log(swiper);
          }}
        >
          {house.pictures.map((picture) => {
            return (
              <SwiperSlide>
                <img src={picture.src} alt={picture.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <h2>{house.name}</h2>
    </div>
  );
}

// Import Swiper styles

// {
//    "id": 1,
//    "name": "Assistant Avon teal Swiss",
//    "bedrooms": 2,
//    "maxGuests": 4,
//    "facility": [
//      "Wifi",
//      "Jacuzzi",
//      "Parking",
//      "Kitchen"
//    ],
//    "city": "Salina",
//    "hostProfile": "Aliya.Schulist63anet",
//    "price": 87,
//    "reviews": [],
//    "pictures": [
//      {
//        "src": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//        "alt": "whole house"
//      },
//      {
//        "src": "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//        "alt": "bedroom"
//      },
//      {
//        "src": "https://images.pexels.com/photos/892618/pexels-photo-892618.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//        "alt": "living room"
//      },
//      {
//        "src": "https://images.pexels.com/photos/3288104/pexels-photo-3288104.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
//        "alt": "bathroom"
//      },
//      {
//        "src": "https://images.pexels.com/photos/2208891/pexels-photo-2208891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//        "alt": "kitchen"
//      }
//    ],
//    "hostAvatar": "https://cdn.fakercloud.com/avatars/mighty55_128.jpg"
//  }
