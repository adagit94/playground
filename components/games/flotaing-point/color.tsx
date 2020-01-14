import React from 'react';

.controller__panel__options-player__color-container {
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controller__panel__options-player__color-label {
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.controller__panel__options-player__color-item {
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.controller__panel__options-player__color {
  width: 50px;
}

.controller__panel__options-player__color--undefined {
  color: #f00;
}

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

export default React.memo(Color);