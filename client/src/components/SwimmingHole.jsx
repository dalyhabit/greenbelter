import React from 'react';

function SwimmingHole (props) {
  if (!props.swimmingHole) {
    return (
      <div>
        <h1>Welcome to Greenbelter</h1>
      </div>
      )
  } else {
    return (
    <div>
      <h1>{props.swimmingHole}</h1>
      <h2>Current Flow Rate: {props.waterData.flow} cf/s</h2>
      <h2>Current Depth: {props.waterData.depth} ft</h2>
      <h2>Measurement Location: {props.waterData.displayName}</h2>
    </div>
    )
  }
}

export default SwimmingHole;
