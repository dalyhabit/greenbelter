import React from 'react';
import ReactDOM from 'react-dom';
import SwimmingHole from './components/SwimmingHole.jsx';
import GreenbeltMap from './components/GreenbeltMap.jsx';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalType: null,
      modalName: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(type, name) {
    console.log('TYPE:', type);
    console.log('NAME:', name);
    this.setState({ 
      modalIsOpen: true,
      modalType: type,
      modalName: name
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      modalType: null,
      modalName: null
    });
  }

  render () {
    return (
        <div className="react-root">
          <GreenbeltMap openModal={this.openModal}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-header"></div>
            <div className="flex-container">
              <div className="google-map"></div>
              <div className="description"></div>
            </div>
          </Modal>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));