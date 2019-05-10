import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SwimmingHole from './components/SwimmingHole.jsx';
import GreenbeltMap from './components/GreenbeltMap.jsx';
import Toolbar from './components/Toolbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      locationIndex: {
        'Hill of Life': 'lostCreek',
        'Sculpture Falls': 'lostCreek',
        'Twin Falls': 'lostCreek',
        'Gus Fruh': 'loop360',
        'Campbell\'s Hole': 'loop360',
        'The Flats': 'loop360',
        'Barton Springs': 'belowBartonSprings',
      },
      showMap: true
    };
    this.changeSwimmingHole = this.changeSwimmingHole.bind(this);
    this.clickMap = this.clickMap.bind(this);
  }

  changeSwimmingHole (value) {
    const waterLocation = this.state.locationIndex[value];
    const mapIndex = {
      'Hill of Life': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.7975397804175!2d-97.83384298447628!3d30.2713493147717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4a6088af8977%3A0xf7761d02e7dd03af!2sHill+of+Life+Dam!5e0!3m2!1sen!2sus!4v1557446017342!5m2!1sen!2sus",
      'Sculpture Falls': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.130777387627!2d-97.82571398447641!3d30.261854815223344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4a6086909eeb%3A0x1b165cc8ddb7d45c!2sSculpture+Falls!5e0!3m2!1sen!2sus!4v1557446981431!5m2!1sen!2sus",
      'Twin Falls': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.582954489266!2d-97.81515148447659!3d30.24896721583599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4b1edfa41ce5%3A0xb376b890977b443a!2sTwin+Falls!5e0!3m2!1sen!2sus!4v1557447054424!5m2!1sen!2sus",
      'Gus Fruh': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.619783824979!2d-97.79861558447658!3d30.247917315885676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4b27dc6e86cb%3A0x1fded220f7f66b8e!2sGus+Fruh!5e0!3m2!1sen!2sus!4v1557447097760!5m2!1sen!2sus",
      'Campbell\'s Hole': "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13784.746067002048!2d-97.79074564871826!3d30.260266443836517!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9beb4c67b89c756!2sCampbell&#39;s+Hole!5e0!3m2!1sen!2sus!4v1557521203360!5m2!1sen!2sus",
      'The Flats': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.1967608611913!2d-97.78748408447643!3d30.259974515312805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5f0427108fe34c0c!2sThe+Flats!5e0!3m2!1sen!2sus!4v1557447187509!5m2!1sen!2sus",
      'Barton Springs': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.0552478460304!2d-97.77316098447638!3d30.264007015121038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b53a8c49575d%3A0xe4a16a1a804ca8b9!2sBarton+Springs+Municipal+Pool!5e0!3m2!1sen!2sus!4v1557447229219!5m2!1sen!2sus",
    };
    this.setState({
      swimmingHole: {
        name: value,
        mapUrl: mapIndex[value]
      },
      waterData: this.state[waterLocation],
      showMap: false
    });
  }

  clickMap () {
    this.setState({
      swimmingHole: null,
      waterData: null,
      showMap: true
    });
  }

  componentDidMount() {
    // Get water flow data from USGS on page load
    $.ajax({
      url: '/greenbelt-data', 
      success: (data) => {
        console.log('greenbelt data:', data);
        this.setState({
          aboveBartonSprings : data.aboveBartonSprings,
          belowBartonSprings : data.belowBartonSprings,
          oakHill : data.oakHill,
          lostCreek : data.lostCreek,
          loop360 : data.loop360
        });
        console.log('STATE:', this.state);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    if (!this.state.showMap) {
      return (
        <div className="react-root">
          <Toolbar clickMap={this.clickMap} showMap={this.state.showMap}/>
          <SwimmingHole
            className="swimming-hole"
            waterData={this.state.waterData}
            swimmingHole={this.state.swimmingHole} />
        </div>
      )
    } else {
      return (
        <div className="react-root">
          <Toolbar clickMap={this.clickMap} showMap={this.state.showMap}/>
          <GreenbeltMap className="greenbelt-map" changeSwimmingHole={this.changeSwimmingHole}/>
        </div>
        )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));