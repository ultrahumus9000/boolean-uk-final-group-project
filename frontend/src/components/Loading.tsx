import React from "react"
import spinner from "../assets/spinner.png"
import doorHanger from "../assets/doorHanger.png"

export default function Profile() {
  return (
    <div className="wrapper">
      <div className="loader">
        <img className="doorHanger" src={doorHanger} alt="Loading" />
        <p> Just a minute... </p>
      </div>
    </div>
  )
}
