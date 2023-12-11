import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import GreenbeltMap from './components/GreenbeltMap.jsx';
import SwimmingHole from './components/SwimmingHole.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
      waterDataLocation: null,
      locationType: null,
      screenWidth: 0,
      screenHeight: 0,
      gaugeWidth: 0,
      flow: null,
      depth: null,
      depthColor: '#EF5350',
      flowColor: '#EF5350',
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
    this.updateWaterData = this.updateWaterData.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
    this.setGaugeSize(window.innerWidth);
  }

  setGaugeSize(width) {
    let gaugeWidth;
    if (width > 1200) {
      gaugeWidth = 280;
    } else if (width <= 1200 && width > 1023) {
      gaugeWidth = 260;
    } else if (width <= 1023 && width > 767) {
      gaugeWidth = 240;
    } else if (width <= 767 && width > 480) {
      gaugeWidth = 220;
    } else if (width <= 480) {
      gaugeWidth = 180;
    }

    this.setState({ gaugeWidth: gaugeWidth });
  }

  setGaugeColor(flow, depth) {
    const colors = {
      red: '#EF5350',
      yellow: '#FFCA28',
      green: '#66BB6A'
    };
    let flowColor;
    let depthColor;

    if (flow < 3) {
      flowColor = colors.red;
    } else if (flow >= 3 && flow < 10) {
      flowColor = colors.yellow;
    } else if (flow >= 10 && flow < 150) {
      flowColor = colors.green;
    } else if (flow >= 150 && flow < 300) {
      flowColor = colors.yellow;
    } else {
      flowColor = colors.red;
    }

    if (depth < 2) {
      depthColor = colors.red;
    } else {
      depthColor = colors.green;
    }

    this.setState({
      depthColor: depthColor,
      flowColor: flowColor
    });
  }

  updateLocation(type, name) {
    this.setState({
      selectedLocation: name,
      locationType: type
    });
    const siteId = this.state.siteIndex[name];
    this.fetchWaterData(siteId);
  }

  updateWaterData(name) {
    const siteId = this.state.siteIndex[name];
    this.fetchWaterData(siteId);
  }

  fetchWaterData(siteId) {
    fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${siteId}&parameterCd=00060,00065&siteStatus=all`)
      .then(response => response.json())
      .then((data) => {
        const flow = Number(data.value.timeSeries[0].values[0].value[0].value);
        const depth = Number(data.value.timeSeries[1].values[0].value[0].value);
        this.setState({
          waterDataLocation: data.value.timeSeries[0].sourceInfo.siteName,
          flow: flow,
          depth: depth
        });
        this.setGaugeColor(flow, depth);
      })
      .catch(error => {
        console.error('ERROR FETCHING WATER DATA\n', error);
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="react-root">
          <Route
            exact
            path='/'
            render={() => <GreenbeltMap updateLocation={this.updateLocation} />}
          />
          <Route
            path='/:url'
            render={({ match }) => <SwimmingHole match={match} flow={this.state.flow} depth={this.state.depth} flowColor={this.state.flowColor} depthColor={this.state.depthColor} waterDataLocation={this.state.waterDataLocation} selectedLocation={this.state.selectedLocation} locationType={this.state.locationType} gaugeWidth={this.state.gaugeWidth} updateWaterData={this.updateWaterData} updateLocation={this.updateLocation} />}
          />
          <div id="footer">
            <p id="copyright">Copyright &copy; 2023 <a className="footer-link" name="patrick-daly-website" target="_blank" href="https://dalyhabit.com">Patrick Daly</a>. All rights reserved.</p>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));