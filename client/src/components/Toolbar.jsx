import React from 'react';

const Toolbar = () => {
  return (
  <div className="toolbar">
    <h1 className="title">Greenbelter</h1>
    <span className="spacer"></span>
    <ul className="nav-links">
      <li className="link">Map</li>
      <li className="link">Water</li>
      <li className="link">Swimming Holes</li>
    </ul>
  </div>
  )
}

export default Toolbar;