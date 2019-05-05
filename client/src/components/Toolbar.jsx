import React from 'react';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.clickMap();
  }

  render() {
    if (this.props.showMap) {
      return (
        <div className="toolbar">
          <h1 className="title">Greenbelter</h1>
        </div>
      )
    } else {
      return (
        <div className="toolbar">
          <h1 className="title">Greenbelter</h1>
          <ul className="nav-links">
            <li className="link" onClick={() => {this.handleClick()}}>Back to map</li>
            {/* <li className="link">Water</li>
            <li className="link">Swimming Holes</li> */}
          </ul>
        </div>
      )
    }
  }

}