import React from 'react';

import './dimensions.css';

function dimensions(props) {
  const dimensions = props.data.dimensions;
  let text = '';

  switch (dimensions) {
    case 10:
      text = 'Small';
      break;
    case 20:
      text = 'Medium';
      break;
    case 30:
      text = 'Big';
      break;
    default:
      text = '';
  }

  return (
    <Square className='controller__panel__options-common__parameters__dimensions'>
      <label htmlFor='width'>dimensions: </label>
      <input onChange={e => props.data.handledimensions(e.target.value)} value={dimensions} type='range' min='10' max='30' step='10' id='dimensions' />
      {text}
    </Square>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.dimensions === nextProps.data.dimensions) return true;
}

export default React.memo(dimensions, areEqual);