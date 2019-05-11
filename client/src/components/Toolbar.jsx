import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Toolbar() {
  return (
    <div className="toolbar">
      <Link to="/">
        <h1 className="title">greenbelter.io</h1>
      </Link>
    </div>
  )
}

export default Toolbar;