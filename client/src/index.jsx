import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import GreenbeltMap from './components/GreenbeltMap.jsx';
import SwimmingHole from './components/SwimmingHole.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
      locationType: null,
      width: 0,
      height: 0,
      gaugeWidth: 0,
      orientation: null,
      location: null,
      flow: null,
      depth: null,
      siteIndex: {
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
      }
    };

    this.fetchWaterData = this.fetchWaterData.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("deviceorientation", this.handleOrientation);
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener("deviceorientation", this.handleOrientation);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleOrientation(event) {
    console.log('EVENT:', event);
  }
  
  updateWindowDimensions() {
    const orientation = window.orientation;
    this.setState({ 
      width: window.innerWidth, 
      height: window.innerHeight,
      orientation: orientation
    });
    this.setGaugeSize(window.innerWidth, orientation);
  }

  setGaugeSize(width, orientation) {
    if (width > 1200) {
      this.setState({
        gaugeWidth: 210
      });
    } else if (width <= 1200 && width > 1023) {
      this.setState({
        gaugeWidth: 180
      });
    } else if (width <= 1023 && width > 767) {
      this.setState({
        gaugeWidth: 155
      });
    } else if (width <= 767 && width > 480) {
      if (orientation) {
        this.setState({
          gaugeWidth: 155
        });
      } else {
        this.setState({
          gaugeWidth: 210
        });
      }
    } else if (width <= 480) {
      this.setState({
        gaugeWidth: 155
      });
    }
  }

  updateLocation(type, name) {
    this.setState({ 
      selectedLocation: name,
      locationType: type
    });
    const siteId = this.state.siteIndex[name];
    this.fetchWaterData(siteId);
  }

  fetchWaterData(siteId) {
    fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${siteId}&parameterCd=00060,00065&siteStatus=all`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
          location: data.value.timeSeries[0].sourceInfo.siteName,
          flow: Number(data.value.timeSeries[0].values[0].value[0].value),
          depth: Number(data.value.timeSeries[1].values[0].value[0].value)
        });
    })
    .catch(error => {
      console.error('ERROR FETCHING WATER DATA\n', error);
    })
  }

  render () {
    return (
      <BrowserRouter>
        <div className="react-root">
          <Route
            exact
            path='/'
            render={() => <GreenbeltMap updateLocation={this.updateLocation}/>}
          />
          <Route
            path='/:url'
            render={() => <SwimmingHole flow={this.state.flow} depth={this.state.depth} location={this.state.location} selectedLocation={this.state.selectedLocation} locationType={this.state.locationType} gaugeWidth={this.state.gaugeWidth} updateLocation={this.updateLocation}/>}
          />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));