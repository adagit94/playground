import React from 'react';

import './Color.css';

function Color(props) {
  return (
    <Square className='controller__panel__options-player__color-container'>
      <label className='controller__panel__options-player__color-label' htmlFor='color'>Color:</label>
      <Square className='controller__panel__options-player__color-item'>
        <input className='controller__panel__options-player__color' onChange={e => props.data.handleColor(e.target.value, props.id)} value={props.data.color} type='color' id='color' />
      </Square>
    </Square>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.color === nextProps.data.color) return true;
}

export default React.memo(Color, areEqual);