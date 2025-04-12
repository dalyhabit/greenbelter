import React, { useState, useEffect } from 'react';
import Details from './Details.jsx';
import GoogleMap from './GoogleMap.jsx';
import { Link, useParams } from 'react-router-dom';

const SwimmingHole = (props) => {
  const [typeIndex] = useState({
    "hill-of-life": "star",
    "sculpture-falls": "star",
    "twin-falls": "star",
    "gus-fruh": "star",
    "campbells-hole": "star",
    "the-flats": "star",
    "barton-springs": "star",
    "lost-creek": "droplet",
    "loop-360": "droplet",
    "above-barton-springs": "droplet"
  });

  const [nameIndex] = useState({
    "hill-of-life": "Hill of Life Dam",
    "sculpture-falls": "Sculpture Falls",
    "twin-falls": "Twin Falls",
    "gus-fruh": "Gus Fruh",
    "campbells-hole": "Campbell's Hole",
    "the-flats": "The Flats",
    "barton-springs": "Barton Springs",
    "lost-creek": "Lost Creek Blvd",
    "loop-360": "Loop 360",
    "above-barton-springs": "Above Barton Springs"
  });

  useEffect(() => {
    const url = props.selectedLocation;
    if (url && url !== props.selectedLocation) {
      props.updateLocation(typeIndex[url], url);
    }
  }, [props.selectedLocation]);

  return (
    <div className="app-body swimming-hole-component">
      <div className="swimming-hole-container">
        <div className="swimming-hole-header">
          <Link to="/" name="back-arrow">
            <svg className="back-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" /></svg>
          </Link>
          <h2 id="location-title">
            {nameIndex[props.selectedLocation]}
          </h2>
        </div>
        <div className="swimming-hole-body">
          <div className="google-map">
            <GoogleMap selectedLocation={props.selectedLocation} />
          </div>
          <div className="description">
            <Details
              flow={props.flow}
              depth={props.depth}
              flowColor={props.flowColor}
              depthColor={props.depthColor}
              waterDataLocation={props.waterDataLocation}
              selectedLocation={props.selectedLocation}
              locationType={props.locationType}
              updateWaterData={props.updateWaterData}
              updateLocation={props.updateLocation}
              gaugeWidth={props.gaugeWidth}
            />
          </div>
        </div>
        <div className="swimming-hole-footer">
          <p className="disclaimer">The Austin Parks Department closes trailheads after heavy rain. Always check park closure status at the <a target="_blank" href="http://austintexas.gov/parkclosures">City of Austin Parks and Recreation Website</a> or call the Barton Creek Greenbelt Hotline at (512) 974-1250 before going to the Barton Creek Greenbelt. The city of Austin does not provide Safe Swimming Threshold data for the Barton Creek Greenbelt. Stagnant or slow-moving water can lead to bacteria build-up. Water that is moving too quickly can be dangerous. The data provided on this website is for informational purposes only. Swim at your own risk. Copyright &copy; 2019 Patrick Daly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SwimmingHole;
