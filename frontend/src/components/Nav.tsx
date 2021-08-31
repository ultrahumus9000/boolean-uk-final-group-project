import React from "react"
import { Link } from "react-router-dom"
// import logo from "../images/logo.svg"

export default function Nav(){
   return   (
   <div className="nav">
      {/* <img src={logo} alt="Hotelable" /> */}
   <Link to="/" className="nav-btn"><h1>Hotelable</h1></Link>
   </div>
   )
}