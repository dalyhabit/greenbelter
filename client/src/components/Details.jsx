import React from 'react';
import ReactSpeedometer from "react-d3-speedometer"

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
      },
      nameIndex: {
        "hill-of-life": "Hill of Life Dam",
        "sculpture-falls": "Sculpture Falls",
        "twin-falls": "Twin Falls",
        "gus-fruh": "Gus Fruh",
        "campbells-hole": "Campbell's Hole",
        "the-flats": "The Flats",
        "barton-springs": "Barton Springs"
      },
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
    }
  }

  handleClick(type, name) {
    this.props.updateLocation(type, name);
  }

  componentWillMount() {
    const swimmingHole = this.props.selectedLocation;
    const siteId = this.state.siteIndex[swimmingHole];
    this.setState({
      name: this.state.nameIndex[swimmingHole]
    });
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

  render() {
    return (
      <div className="app-body swimming-hole-container">
        <div className="swimming-hole-water">
          <h3 className="details-title">Water Data</h3>
          <div className="details-body">
            <div className="flow-gauge">
              <p className="gauge-label">Depth</p>
              <ReactSpeedometer
                segments={5}
                minValue={0}
                maxValue={15}
                value={this.state.depth ? this.state.depth : 0}
                height={this.props.gaugeWidth}
                width={this.props.gaugeWidth}
                segmentColors={[
                  "#F44336",
                  "#FFC107",
                  "#4CAF50",
                  "#2196F3",
                  "#3F51B5",
                ]}
                needleTransition="easeElastic"
                needleColor="#5b5b5b"
                currentValueText="${value} ft"
              />
            </div>
            <div className="flow-gauge">
              <p className="gauge-label">Flow Rate</p>
              <ReactSpeedometer
                segments={5}
                minValue={0}
                maxValue={300}
                value={this.state.flow ? this.state.flow : 0}
                height={this.props.gaugeWidth}
                width={this.props.gaugeWidth}
                segmentColors={[
                  "#2196F3",
                  "#4CAF50",
                  "#FFEB3B",
                  "#FF9800",
                  "#F44336",
                ]}
                needleTransition="easeElastic"
                needleColor="#5b5b5b"
                currentValueText="${value} cf/s"
              />
            </div>
          </div>
          <div className="location-details" onClick={() => { this.handleClick('droplet', this.state.waterIndex[this.props.selectedLocation]) }}>
            <h4>Measurement Location:</h4>
            <p className="location-name">{this.state.location ? this.state.location : 'Loading...'}</p>
          </div>
        </div>
      </div>
    )
  }
}