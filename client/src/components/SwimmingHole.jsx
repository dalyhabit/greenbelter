import React from 'react';

function SwimmingHole (props) {
  return (
  <div className="app-body swimming-hole-container">
    <div className="swimming-hole-map">

    </div>
    <div className="swimming-hole-water">
      <ul className="water-data">
        <li>{props.swimmingHole}</li>
        <li>Measurement Location: {props.waterData.displayName}</li>
        <li>Current Flow Rate: {props.waterData.flow} cf/s</li>
        <li>Current Depth: {props.waterData.depth} ft</li>
      </ul>
    </div>
  </div>
  )
}

export default SwimmingHole;
