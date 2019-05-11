import React from 'react';

export default class SwimmingHole extends React.Component {

  constructor(props) {
    console.log('PROPS:', props);
    super(props);
    this.state = {
      siteIndex: {
        "hill-of-life": "08155240",
        "sculpture-falls": "08155240",
        "twin-falls": "08155240",
        "gus-fruh": "08155300",
        "campbells-hole": "08155300",
        "the-flats": "08155300",
        "barton-springs": "08155400"
      },
      mapIndex: {
        "hill-of-life": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.7975397804175!2d-97.83384298447628!3d30.2713493147717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4a6088af8977%3A0xf7761d02e7dd03af!2sHill+of+Life+Dam!5e0!3m2!1sen!2sus!4v1557446017342!5m2!1sen!2sus",
        "sculpture-falls": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.130777387627!2d-97.82571398447641!3d30.261854815223344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4a6086909eeb%3A0x1b165cc8ddb7d45c!2sSculpture+Falls!5e0!3m2!1sen!2sus!4v1557446981431!5m2!1sen!2sus",
        "twin-falls": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.582954489266!2d-97.81515148447659!3d30.24896721583599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4b1edfa41ce5%3A0xb376b890977b443a!2sTwin+Falls!5e0!3m2!1sen!2sus!4v1557447054424!5m2!1sen!2sus",
        "gus-fruh": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.619783824979!2d-97.79861558447658!3d30.247917315885676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4b27dc6e86cb%3A0x1fded220f7f66b8e!2sGus+Fruh!5e0!3m2!1sen!2sus!4v1557447097760!5m2!1sen!2sus",
        "campbells-hole": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13784.746067002048!2d-97.79074564871826!3d30.260266443836517!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9beb4c67b89c756!2sCampbell's+Hole!5e0!3m2!1sen!2sus!4v1557521203360!5m2!1sen!2sus",
        "the-flats": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.1967608611913!2d-97.78748408447643!3d30.259974515312805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5f0427108fe34c0c!2sThe+Flats!5e0!3m2!1sen!2sus!4v1557447187509!5m2!1sen!2sus",
        "barton-springs": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.0552478460304!2d-97.77316098447638!3d30.264007015121038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b53a8c49575d%3A0xe4a16a1a804ca8b9!2sBarton+Springs+Municipal+Pool!5e0!3m2!1sen!2sus!4v1557447229219!5m2!1sen!2sus"
      },
      nameIndex: {
        "hill-of-life": "Hill of Life Dam",
        "sculpture-falls": "Sculpture Falls",
        "twin-falls": "Twin Falls",
        "gus-fruh": "Gus Fruh",
        "campbells-hole": "Campbell's Hole",
        "the-flats": "The Flats",
        "barton-springs": "Barton Springs"
      }
    }
  }

  componentWillMount() {
    const swimmingHole = this.props.location.pathname.substring(9);
    const siteId = this.state.siteIndex[swimmingHole];
    this.setState({
      mapUrl: this.state.mapIndex[swimmingHole],
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
        <div className="swimming-hole-map">
          <iframe src={this.state.mapUrl} width="800" height="600" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className="swimming-hole-water">
            <h2>{this.state.name ? this.state.name : ''}</h2>
          <ul className="water-data">
            <li><span className="key">Measurement Location:</span><span className="value">{this.state.location ? this.state.location : 'Loading...'}</span></li>
              <li><span className="key">Current Flow Rate:</span><span className="value">{this.state.flow ? this.state.flow + ' cf/s' : 'Loading...'}</span></li>
              <li><span className="key">Current Depth: </span><span className="value">{this.state.depth ? this.state.depth + ' ft' : 'Loading...'}</span></li>
              <li><p className="disclaimer">The Austin Parks Department closes trailheads after heavy rain. Always check park closure status at the <a href="http://austintexas.gov/parkclosures">City of Austin Parks and Recreation Website</a> or call the Barton Creek Greenbelt Hotline at (512) 974-1250 before going to the Barton Creek Greenbelt. The city of Austin does not provide Safe Swimming Threshold data for the Barton Creek Greenbelt. Stagnant or slow-moving water can lead to bacteria build-up. Water that is moving too quickly can be dangerous. The data provided on this website is for informational purposes only. Swim at your own risk.</p></li>
          </ul>
        </div>
      </div>
    )
  }
}