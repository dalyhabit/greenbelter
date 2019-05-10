import React from 'react';

function SwimmingHole (props) {
  return (
  <div className="app-body swimming-hole-container">
    <div className="swimming-hole-map">
      <iframe src={props.swimmingHole.mapUrl} width="800" height="600" frameBorder="0" allowFullScreen></iframe>
    </div>
    <div className="swimming-hole-water">
        <h2>{props.swimmingHole.name ? props.swimmingHole.name : ''}</h2>
      <ul className="water-data">
          <li><span className="key">Measurement Location:</span><span className="value">{props.waterData ? props.waterData.displayName : ''}</span></li>
          <li><span className="key">Current Flow Rate:</span><span className="value">{props.waterData ? props.waterData.flow : ''} cf/s</span></li>
          <li><span className="key">Current Depth: </span><span className="value">{props.waterData ? props.waterData.depth : ''} ft</span></li>
      </ul>
    </div>
  </div>
  )
}

export default SwimmingHole;
