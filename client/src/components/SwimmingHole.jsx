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
        <h2>Current Flow Rate at Oak Hill: {props.oakHillFlow} cf/s</h2>
        <h2>Current Depth at Oak Hill: {props.oakHillDepth} ft</h2>
        <h2>Location: 1710 Camp Craft Road</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Sculpture Falls') {
    return (
      <div>
        <h1>Sculpture Falls</h1>
        <h2>Current Flow Rate at Oak Hill: {props.oakHillFlow} cf/s</h2>
        <h2>Current Depth at Oak Hill: {props.oakHillDepth} ft</h2>
        <h2>Location: 1710 Camp Craft Road</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Twin Falls') {
    return (
      <div>
        <h1>Twin Falls</h1>
        <h2>Current Flow Rate at Oak Hill: {props.oakHillFlow} cf/s</h2>
        <h2>Current Depth at Oak Hill: {props.oakHillDepth} ft</h2>
        <h2>Location: 3918 S MoPac Expressway</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Gus Fruh') {
    return (
      <div>
        <h1>Gus Fruh</h1>
        <h2>Current Flow Rate at Loop 360: {props.loop360Flow} cf/s</h2>
        <h2>Current Depth at Loop 360: {props.loop360Depth} ft</h2>
        <h2>Location: 2642 Barton Hills Drive</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Campbell\'s Hole') {
    return (
      <div>
        <h1>Campbell's Hole</h1>
        <h2>Current Flow Rate at Loop 360: {props.loop360Flow} cf/s</h2>
        <h2>Current Depth at Loop 360: {props.loop360Depth} ft</h2>
        <h2>Location: 1601 Spyglass Drive</h2>
      </div>
      )
  } else if (props.swimmingHole === 'The Flats') {
    return (
      <div>
        <h1>The Flats</h1>
        <h2>Current Flow Rate at Loop 360: {props.loop360Flow} cf/s</h2>
        <h2>Current Depth at Loop 360: {props.loop360Depth} ft</h2>
        <h2>Location: 2010 Homedale Drive</h2>
      </div>
      )
  } else if (props.swimmingHole === 'Barton Springs') {
    return (
      <div>
        <h1>Barton Springs</h1>
        <h2>Current Flow Rate above Barton Springs: {props.aboveBartonSpringsFlow} cf/s</h2>
        <h2>Current Depth above Barton Springs: {props.aboveBartonSpringsDepth} ft</h2>
        <h2>Location: 2201 Barton Springs Road</h2>
      </div>
      )
  }
}

export default SwimmingHole;
