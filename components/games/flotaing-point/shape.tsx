import React from 'react';

import './Shape.css';
import './Shared.css';

function Shape(props) {
  const shape = props.data.shape;
  const shapeOthers = props.data.shapeOthers;
  const bgColor = {
    backgroundColor: props.data.color
  };

  let classes = {
    square: {
      class: 'controller__panel__options-player__shape controller__panel__options-player__shape--square',
      selected: false,
      disabled: false,
      clickable: true
    },
    circle: {
      class: 'controller__panel__options-player__shape controller__panel__options-player__shape--circle',
      selected: false,
      disabled: false,
      clickable: true
    },
    rhombus: {
      class: 'controller__panel__options-player__shape controller__panel__options-player__shape--rhombus',
      selected: false,
      disabled: false,
      clickable: true
    },
    ellipse: {
      class: 'controller__panel__options-player__shape controller__panel__options-player__shape--ellipse',
      selected: false,
      disabled: false,
      clickable: true
    }
  };

  if (shape !== '' && shape !== undefined) {
    classes[shape].class += ' controller__panel__options-player__shape--selected';
    classes[shape].selected = true;
  }

  shapeOthers.forEach(el => {
    if (el in classes) {
      classes[el].class += ' controller__panel__options-player__shape--disabled';
      classes[el].disabled = true;

      if (classes[el].selected === false) classes[el].clickable = false;
    }
  });
  
  return (
    <div className='controller__panel__options-player__shape-container'>
      <label className={shape === undefined ? 'controller__panel__options-player__shape-label controller__panel__options-player__shape--undefined' : 'controller__panel__options-player__shape-label'} htmlFor='color'>Shape:</label>
      <div className='controller__panel__options-player__shape-items'>
        <div style={bgColor} className={classes.square.class} onClick={classes.square.clickable ? e => props.data.handleShape(e.target.id, props.id) : null} id='square' />
        <div style={bgColor} className={classes.circle.class} onClick={classes.circle.clickable ? e => props.data.handleShape(e.target.id, props.id) : null} id='circle' />
        <div style={bgColor} className={classes.rhombus.class} onClick={classes.rhombus.clickable ? e => props.data.handleShape(e.target.id, props.id) : null} id='rhombus' />
        <div style={bgColor} className={classes.ellipse.class} onClick={classes.ellipse.clickable ? e => props.data.handleShape(e.target.id, props.id) : null} id='ellipse' />
      </div>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.shape === nextProps.data.shape && prevProps.data.shapeOthers.toString() === nextProps.data.shapeOthers.toString()) return true;
}

export default React.memo(Shape, areEqual);