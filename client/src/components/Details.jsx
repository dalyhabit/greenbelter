import React, { useState } from 'react';

const Details = ({ locationType, depth, flow, depthColor, flowColor, selectedLocation, updateWaterData }) => {
  const [waterLocation, setWaterLocation] = useState('Upstream');
  const [otherLocation, setOtherLocation] = useState('Downstream');

  const waterIndex = {
    "hill-of-life": "lost-creek",
    "sculpture-falls": "lost-creek",
    "twin-falls": "lost-creek",
    "gus-fruh": "loop-360",
    "campbells-hole": "loop-360",
    "the-flats": "loop-360",
    "barton-springs": "above-barton-springs",
    "lost-creek": "lost-creek",
    "loop-360": "loop-360",
    "above-barton-springs": "above-barton-springs"
  };

  const downstreamWaterIndex = {
    "hill-of-life": "loop-360",
    "sculpture-falls": "loop-360",
    "twin-falls": "loop-360",
    "gus-fruh": "above-barton-springs",
    "campbells-hole": "above-barton-springs",
    "the-flats": "above-barton-springs",
    "barton-springs": "above-barton-springs",
  };

  const handleClick = (name) => {
    let newWaterLocation;
    if (waterLocation === 'Upstream') {
      newWaterLocation = downstreamWaterIndex[name];
      setWaterLocation('Downstream');
      setOtherLocation('Upstream');
    } else {
      newWaterLocation = waterIndex[name];
      setWaterLocation('Upstream');
      setOtherLocation('Downstream');
    }
    updateWaterData(newWaterLocation);
  };

  return (
    <div className="details-container">
      <div className="swimming-hole-water">
        {locationType === 'star' ? 
          <h3 className="details-title">{waterLocation} Water Data</h3> : 
          <h3 className="details-title">Water Data</h3>
        }
        <div className="details-body">
          <div className="data-display">
            <h4>Depth</h4>
            <p className="data-value" style={{ color: depthColor }}>
              {depth || flow === 0 ? `${depth} ft` : 'Loading...'}
            </p>
          </div>
          <div className="data-display">
            <h4>Flow Rate</h4>
            <p className="data-value" style={{ color: flowColor }}>
              {flow || flow === 0 ? `${flow} cf/s` : 'Loading...'}
            </p>
          </div>
        </div>
        <div className="location-details">
          {locationType === 'star' && (
            <p 
              className="change-water-link" 
              onClick={() => handleClick(selectedLocation)}
            >
              View {otherLocation} Water Data Instead
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;