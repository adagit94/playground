import React from 'react';

import './Color.css';

function Color(props) {
  return (
    <div className='controller__panel__options-player__color-container'>
      <label className='controller__panel__options-player__color-label' htmlFor='color'>Color:</label>
      <div className='controller__panel__options-player__color-item'>
        <input className='controller__panel__options-player__color' onChange={e => props.data.handleColor(e.target.value, props.id)} value={props.data.color} type='color' id='color' />
      </div>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.color === nextProps.data.color) return true;
}

export default React.memo(Color, areEqual);