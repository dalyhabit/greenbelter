import React from 'react';
import Details from './Details.jsx';
import GoogleMap from './GoogleMap.jsx';
import { NavLink } from 'react-router-dom';

export default class SwimmingHole extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeIndex: {
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
      },
      nameIndex: {
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
      }
    }
  }

  componentDidMount () {
    const location = window.location.pathname.substr(1);
    if (this.state.typeIndex[location]) {
      this.props.updateLocation(this.state.typeIndex[location], location);
    }
  }

  render () {
    return (
      <div className="swimming-hole-component">
        <div className="modal-body">
          <div className="modal-header">
            <NavLink to="/">
              <svg className="back-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" /></svg>
            </NavLink>
            <h2 id="location-title">
              {this.state.nameIndex[this.props.selectedLocation]}
            </h2>
          </div>
          <div className="flex-container">
            <div className="google-map">
              <GoogleMap selectedLocation={this.props.selectedLocation} />
            </div>
            <div className="description">
              <Details flow={this.props.flow} depth={this.props.depth} flowColor={this.props.flowColor} depthColor={this.props.depthColor} location={this.props.location} selectedLocation={this.props.selectedLocation} locationType={this.props.locationType} updateLocation={this.props.updateLocation} gaugeWidth={this.props.gaugeWidth} />
            </div>
          </div>
          <div className="modal-footer">
            <p className="disclaimer">The Austin Parks Department closes trailheads after heavy rain. Always check park closure status at the <a href="http://austintexas.gov/parkclosures">City of Austin Parks and Recreation Website</a> or call the Barton Creek Greenbelt Hotline at (512) 974-1250 before going to the Barton Creek Greenbelt. The city of Austin does not provide Safe Swimming Threshold data for the Barton Creek Greenbelt. Stagnant or slow-moving water can lead to bacteria build-up. Water that is moving too quickly can be dangerous. The data provided on this website is for informational purposes only. Swim at your own risk.</p>
          </div>
        </div>
      </div>
    )
  }
}
