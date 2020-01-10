
import React from 'react';

import './Speed.css';

function Speed(props) {
  const speed = props.data.speed;

  return (
    <Square className='controller__panel__options-common__parameters__speed' >
      <label htmlFor='speed'>Speed:</label>
      <input onChange={e => props.data.handleSpeed(Number(e.target.value))} value={speed} type='range' min='1' max='5' step="2" id='speed' />
      {speed > 0 && speed + 'x'}
    </Square>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.speed === nextProps.data.speed) return true;
}

export default React.memo(Speed, areEqual);