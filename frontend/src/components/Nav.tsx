import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
// import logo from "../images/logo.svg"
import useStore from "../store";

export default function Nav() {
  const currentUser = useStore((state) => state.currentUser);

  console.log(currentUser)

  return (
    <div className="nav">
      {/* <img src={logo} alt="Hotelable" /> */}
      <Link to="/" className="nav-btn">
        <h1>Hotelable</h1>
      </Link>
      <div>
        {!currentUser.username &&
          <Link to="/login">
            <Button variant="contained" color="secondary"> Login</Button>
          </Link>}
        {currentUser.username &&
          <Link to="/guest/dashboard">
            <Button variant="contained" color="secondary"> Dashboard</Button>
          </Link>}
      </div>
    </div>
  )
}
