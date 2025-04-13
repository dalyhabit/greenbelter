import React, { useState } from 'react';
import WaterChart from './WaterChart';

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
        <div className="details-body">
          <div className="data-display">
            <WaterChart
              value={depth}
              mode="depth"
              thresholds={{ low: 1.5, safe: 4 }}
              max={15}
              label="Depth"
              unit="ft"
            />
          </div>
          <div className="data-display">
            <WaterChart
              value={flow}
              mode="flow"
              thresholds={{ low: 0, safe: 20, danger: 150 }}
              max={300}
              label="Flow Rate"
              unit="cf/s"
            />
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