import React from 'react';

export default class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const swimmingHole = this.props.selectedLocation;
    this.setState({
      mapUrl: this.state.mapIndex[swimmingHole],
      name: this.state.nameIndex[swimmingHole]
    });
  }

  render() {
    return (
      <div className="app-body swimming-hole-container">
        <div className="swimming-hole-map">
          <iframe src={this.state.mapUrl} width="800" height="600" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}