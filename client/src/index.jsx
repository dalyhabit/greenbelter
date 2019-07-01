import React from 'react';
import ReactDOM from 'react-dom';
import Details from './components/Details.jsx';
import GreenbeltMap from './components/GreenbeltMap.jsx';
import GoogleMap from './components/GoogleMap.jsx';
import Modal from 'react-modal';

const customStyles = {
  content: {
    height: '70%',
    width: '1140px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
      locationType: null,
      modalIsOpen: false,
      nameIndex: {
        "hill-of-life": "Hill of Life Dam",
        "sculpture-falls": "Sculpture Falls",
        "twin-falls": "Twin Falls",
        "gus-fruh": "Gus Fruh",
        "campbells-hole": "Campbell's Hole",
        "the-flats": "The Flats",
        "barton-springs": "Barton Springs",
        "lost-creek": "Lost Creek Blvd at Barton Creek",
        "loop-360": "Loop 360 at Barton Creek",
        "above-barton-springs": "Barton Creek above Barton Springs"
      },
      width: 0,
      height: 0
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
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
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateLocation(type, name) {
    this.setState({ 
      selectedLocation: name,
      locationType: type
    });
    console.log("SELECTED LOCATION:", this.state.nameIndex[name]);
  }

  openModal(type, name) {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      selectedLocation: null,
      locationType: null,
      modalIsOpen: false
    });
  }

  render () {
    return (
        <div className="react-root">
          <GreenbeltMap openModal={this.openModal} updateLocation={this.updateLocation}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Greenbelt Details"
          >
            <div className="modal-body">
              <div className="modal-header">
                <h2>
                  {this.state.nameIndex[this.state.selectedLocation]}
                </h2>
              </div>
              <div className="flex-container">
                <div className="google-map">
                  <GoogleMap selectedLocation={this.state.selectedLocation}/>
                </div>
                <div className="description">
                  <Details selectedLocation={this.state.selectedLocation} updateLocation={this.updateLocation} screenWidth={this.state.width}/>
                </div>
              </div>
              <div className="modal-footer">
                <p className="disclaimer">The Austin Parks Department closes trailheads after heavy rain. Always check park closure status at the <a href="http://austintexas.gov/parkclosures">City of Austin Parks and Recreation Website</a> or call the Barton Creek Greenbelt Hotline at (512) 974-1250 before going to the Barton Creek Greenbelt. The city of Austin does not provide Safe Swimming Threshold data for the Barton Creek Greenbelt. Stagnant or slow-moving water can lead to bacteria build-up. Water that is moving too quickly can be dangerous. The data provided on this website is for informational purposes only. Swim at your own risk.</p>
              </div>
            </div>
          </Modal>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));