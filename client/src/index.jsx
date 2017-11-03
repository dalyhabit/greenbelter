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
          oakHill: data.oakHill.flow,
          lostCreek: data.lostCreek.flow,
          loop360: data.loop360.flow,
          aboveBartonSprings: data.aboveBartonSprings.flow,
          belowBartonSprings: data.belowBartonSprings.flow
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
        <SwimmingHole oakHill={this.state.oakHill} lostCreek={this.state.lostCreek} loop360={this.state.loop360} aboveBartonSprings={this.state.aboveBartonSprings} swimmingHole={this.state.swimmingHole}/>
        <GreenbeltMap changeSwimmingHole={this.changeSwimmingHole}/>
      </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));