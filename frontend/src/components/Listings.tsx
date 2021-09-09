import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import address from "../assets/address.svg";

export default function Listings() {
  const [housesForHost, setHousesForHost] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:4000/hosts/houses", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((houses) => {
        setHousesForHost(houses);
      });
  }, []);
  console.log(housesForHost);
  return (
    <>
      {housesForHost.length && (
        <div>
          {housesForHost.map((house) => {
            return (
              <div
                className="listing-container"
                onClick={() => {
                  history.push(`/house/${house.id}`);
                }}
              >
                <img className="house-img" src={house.pictures}></img>
                <div className="listing-details">
                  <div className="hotelName">
                    <p className="listing-title"> {house.name}</p>
                    <p className="address-p">
                      {" "}
                      <img className="address-svg" src={address} /> {house.city}
                    </p>
                  </div>
                  <div className="house-info">
                    <Button
                      variant="contained"
                      color="primary"
                      href="#contained-buttons"
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      href="#contained-buttons"
                    >
                      {" "}
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
