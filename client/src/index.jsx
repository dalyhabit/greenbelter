import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SwimmingHole from './components/SwimmingHole.jsx';
// import GreenbeltMap from 'react-svg-loader!../../assets/greenbelt-map.svg'
import GreenbeltMap from './components/GreenbeltMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      swimmingHole: 'default'
    };
  }

  componentDidMount() {

    $.ajax({
      url: '/greenbelt-data', 
      success: (data) => {
        this.setState({
          oakHill: data.oakHill,
          lostCreek: data.lostCreek,
          loop360: data.loop360,
          aboveBartonSprings: data.aboveBartonSprings,
          belowBartonSprings: data.belowBartonSprings
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
        <SwimmingHole swimmingHole={this.state.swimmingHole}/>
        <GreenbeltMap/>
      </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));