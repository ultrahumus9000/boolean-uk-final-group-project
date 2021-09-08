import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import heart from "../assets/heart.png";
import account from "../assets/account.svg";
import { useHistory } from "react-router";
import useStore from "../store";

export default function BottomNav() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const history = useHistory();

  function switchToHost() {
    fetch("http://localhost:4000/guests/switch", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res === "true") {
          setCurrentUser({ ...currentUser, role: "host" });
        } else {
          alert("you dont have a host account");
        }
      });
  }

  function switchToGuest() {
    fetch("http://localhost:4000/hosts/switch", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res === "true") {
          setCurrentUser({ ...currentUser, role: "guest" });
        } else {
          alert("you dont have a guest account");
        }
      });
  }

  return (
    <div className="bottom-nav">
      <img src={heart}></img>
      <Link to="/guest/dashboard">
        <img src={account}></img>
      </Link>
      {currentUser.role === "guest" && (
        <Button onClick={switchToHost} variant="contained" color="secondary">
          {" "}
          Switch to host
        </Button>
      )}
      {currentUser.role === "host" && (
        <Button onClick={switchToGuest} variant="contained" color="secondary">
          {" "}
          Switch to guest
        </Button>
      )}
    </div>
  );
}
