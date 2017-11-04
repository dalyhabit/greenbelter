import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SwimmingHole from './components/SwimmingHole.jsx';
import GreenbeltMap from './components/GreenbeltMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      swimmingHole: 'default'
    };
    this.changeSwimmingHole = this.changeSwimmingHole.bind(this);
  }

  changeSwimmingHole (value) {
    this.setState({
      swimmingHole: value
    });
  }

  componentDidMount() {

    $.ajax({
      url: '/greenbelt-data', 
      success: (data) => {
        this.setState({
          oakHillFlow: data.oakHill.flow,
          lostCreekFlow: data.lostCreek.flow,
          loop360Flow: data.loop360.flow,
          aboveBartonSpringsFlow: data.aboveBartonSprings.flow,
          belowBartonSpringsFlow: data.belowBartonSprings.flow,
          oakHillDepth: data.oakHill.depth,
          lostCreekDepth: data.lostCreek.depth,
          loop360Depth: data.loop360.depth,
          aboveBartonSpringsDepth: data.aboveBartonSprings.depth,
          belowBartonSpringsDepth: data.belowBartonSprings.depth
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
        <GreenbeltMap className="greenbelt-map" changeSwimmingHole={this.changeSwimmingHole}/>
        <SwimmingHole 
          className="swimming-hole" 
          oakHillFlow={this.state.oakHillFlow} 
          lostCreekFlow={this.state.lostCreekFlow} 
          loop360Flow={this.state.loop360Flow} 
          aboveBartonSpringsFlow={this.state.aboveBartonSpringsFlow} 
          oakHillDepth={this.state.oakHillDepth} 
          lostCreekDepth={this.state.lostCreekDepth} 
          loop360Depth={this.state.loop360Depth} 
          aboveBartonSpringsDepth={this.state.aboveBartonSpringsDepth} 
          swimmingHole={this.state.swimmingHole}/>
      </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));