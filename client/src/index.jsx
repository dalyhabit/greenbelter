import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GreenbeltMap from './components/GreenbeltMap.jsx';
import SwimmingHole from './components/SwimmingHole.jsx';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [waterDataLocation, setWaterDataLocation] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [gaugeWidth, setGaugeWidth] = useState(0);
  const [flow, setFlow] = useState(null);
  const [depth, setDepth] = useState(null);
  const [depthColor, setDepthColor] = useState('#EF5350');
  const [flowColor, setFlowColor] = useState('#EF5350');

  const siteIndex = {
    "hill-of-life": "08155240",
    "sculpture-falls": "08155240",
    "twin-falls": "08155240",
    "gus-fruh": "08155300",
    "campbells-hole": "08155300",
    "the-flats": "08155300",
    "barton-springs": "08155400",
    "lost-creek": "08155240",
    "loop-360": "08155300",
    "above-barton-springs": "08155400"
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    setGaugeSize(window.innerWidth);
  };

  const setGaugeSize = (width) => {
    let newGaugeWidth;
    if (width > 1200) {
      newGaugeWidth = 280;
    } else if (width <= 1200 && width > 1023) {
      newGaugeWidth = 260;
    } else if (width <= 1023 && width > 767) {
      newGaugeWidth = 240;
    } else if (width <= 767 && width > 480) {
      newGaugeWidth = 220;
    } else if (width <= 480) {
      newGaugeWidth = 180;
    }
    setGaugeWidth(newGaugeWidth);
  };

  const setGaugeColor = (flow, depth) => {
    const colors = {
      red: '#EF5350',
      yellow: '#FFCA28',
      green: '#66BB6A'
    };
    let newFlowColor;
    let newDepthColor;

    if (flow < 3) {
      newFlowColor = colors.red;
    } else if (flow >= 3 && flow < 10) {
      newFlowColor = colors.yellow;
    } else if (flow >= 10 && flow < 150) {
      newFlowColor = colors.green;
    } else if (flow >= 150 && flow < 300) {
      newFlowColor = colors.yellow;
    } else {
      newFlowColor = colors.red;
    }

    if (depth < 2) {
      newDepthColor = colors.red;
    } else {
      newDepthColor = colors.green;
    }

    setDepthColor(newDepthColor);
    setFlowColor(newFlowColor);
  };

  const updateLocation = (type, name) => {
    setSelectedLocation(name);
    setLocationType(type);
    const siteId = siteIndex[name];
    fetchWaterData(siteId);
  };

  const updateWaterData = (name) => {
    const siteId = siteIndex[name];
    fetchWaterData(siteId);
  };

  const fetchWaterData = (siteId) => {
    fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${siteId}&parameterCd=00060,00065&siteStatus=all`)
      .then(response => response.json())
      .then((data) => {
        const newFlow = Number(data.value.timeSeries[0].values[0].value[0].value);
        const newDepth = Number(data.value.timeSeries[1].values[0].value[0].value);
        setWaterDataLocation(data.value.timeSeries[0].sourceInfo.siteName);
        setFlow(newFlow);
        setDepth(newDepth);
        setGaugeColor(newFlow, newDepth);
      })
      .catch(error => {
        console.error('ERROR FETCHING WATER DATA\n', error);
      });
  };

  return (
    <div className="react-root">
      <Routes>
        <Route
          path="/"
          element={<GreenbeltMap updateLocation={updateLocation} />}
        />
        <Route
          path="/:url"
          element={
            <SwimmingHole
              flow={flow}
              depth={depth}
              flowColor={flowColor}
              depthColor={depthColor}
              waterDataLocation={waterDataLocation}
              selectedLocation={selectedLocation}
              locationType={locationType}
              gaugeWidth={gaugeWidth}
              updateWaterData={updateWaterData}
              updateLocation={updateLocation}
            />
          }
        />
      </Routes>
      <div id="footer">
        <p id="copyright">Copyright &copy; 2023 <a className="footer-link" name="patrick-daly-website" target="_blank" href="https://dalyhabit.com">Patrick Daly</a>. All rights reserved.</p>
      </div>
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);