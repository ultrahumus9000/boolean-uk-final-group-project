import React from "react"

export default function Facility({
  options,
  handleChangeFacility,
  newListing,
  //   children
}) {
  const optionsList = Object.keys(options).map(facility => (
    <li key={facility}>
      <label>
        {facility}
        <input
          onChange={handleChangeFacility}
          type="checkbox"
          name="facility"
          value={facility}
        />
        {options[facility]}
      </label>
    </li>
  ))

  return (
    <div className="form_facilities_checkboxes">
      {/* {children} */}
      <ul>{optionsList}</ul>
    </div>
  )
}
