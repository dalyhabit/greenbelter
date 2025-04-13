import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';
import { env } from '../utils/env';
import Map from './Map';
import Details from './Details';
import WaterChart from './WaterChart';

// Initialize Amplify
Amplify.configure(awsConfig);

const App = () => {
  // Enable debug mode if configured
  if (env.ENABLE_DEBUG_MODE) {
    console.log('Debug mode enabled');
    // Add any debug-specific initialization here
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 