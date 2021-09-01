import React from "react"

export default function HouseCard({ image, city, name, price }) {
  return (
    <div className="house-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{city}</p>
      <h3>
        £{price}
        <span className="h3span"> /night</span>
      </h3>
    </div>
  )
}
