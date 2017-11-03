import React from 'react';
import ListItem from './ListItem.jsx';

function SwimmingHole (props) {
  if (props.swimmingHole === 'default') {
    return (
      <div>
        <h1>Welcome to Greenbelter</h1>
      </div>
      )
  } else if (props.swimmingHole === 'Hill of Life') {
    return (
      <div>
        <h1>Hill of Life</h1>
        <h2>Current Flow Rate: {props.oakHill}</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Sculpture Falls') {
    return (
      <div>
        <h1>Sculpture Falls</h1>
        <h2>Current Flow Rate: {props.oakHill}</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Twin Falls') {
    return (
      <div>
        <h1>Twin Falls</h1>
        <h2>Current Flow Rate: {props.oakHill}</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Gus Fruh') {
    return (
      <div>
        <h1>Gus Fruh</h1>
        <h2>Current Flow Rate: {props.loop360}</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Campbell\'s Hole') {
    return (
      <div>
        <h1>Campbell's Hole</h1>
        <h2>Current Flow Rate: {props.loop360}</h2>
      </div>
      )
  } else if (props.swimmingHole === 'The Flats') {
    return (
      <div>
        <h1>The Flats</h1>
        <h2>Current Flow Rate: {props.loop360}</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Barton Springs') {
    return (
      <div>
        <h1>Barton Springs</h1>
        <h2>Current Flow Rate: {props.aboveBartonSprings}</h2>
      </div>
      )
  }
}

export default SwimmingHole;
