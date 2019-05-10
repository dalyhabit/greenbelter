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
          <li><p className="disclaimer">The Austin Parks Department closes trailheads after heavy rain. Always check park closure status at the <a href="http://austintexas.gov/parkclosures">City of Austin Parks and Recreation Website</a> or call the Barton Creek Greenbelt Hotline at (512) 974-1250 before going to the Barton Creek Greenbelt. The city of Austin does not provide Safe Swimming Threshold data for the Barton Creek Greenbelt. Stagnant or slow-moving water can lead to bacteria build-up. Water that is moving too quickly can be dangerous. The data provided on this website is for informational purposes only. Swim at your own risk.</p></li>
      </ul>
    </div>
  </div>
  )
}

export default SwimmingHole;
