import React from 'react';
import Gauge from 'react-svg-gauge';

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waterIndex: {
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
      }
    }
  }

  handleClick(type, name) {
    this.props.updateLocation(type, name);
  }

  render() {
    return (
      <div className="app-body swimming-hole-container">
        <div className="swimming-hole-water">
          <h3 className="details-title">Water Data</h3>
          <div className="details-body">
            <div className="flow-gauge">
              <Gauge
                value={this.props.depth}
                valueFormatter={(val) => `${val} ft`}
                width={this.props.gaugeWidth}
                height={this.props.gaugeWidth}
                label="Depth"/>
            </div>
            <div className="flow-gauge">
              <Gauge
                value={this.props.flow}
                valueFormatter={(val) => `${val} cf/s`}
                width={this.props.gaugeWidth}
                height={this.props.gaugeWidth}
                label="Flow Rate"
              />
            </div>
          </div>
          <div className="location-details">
            <h4>Measurement Location:</h4>
            <p className="location-name" onClick={() => { this.handleClick('droplet', this.state.waterIndex[this.props.selectedLocation]) }}>{this.props.location ? this.props.location : 'Loading...'}</p>
          </div>
        </div>
      </div>
    )
  }
}