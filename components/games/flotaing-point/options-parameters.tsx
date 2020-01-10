import React from 'react';

import dimensions from './dimensions';
import Speed from './Speed';

import './OptionsParameters.css';
import './Shared.css';

function OptionsParameters(props) {
  return (
    <Square className='controller__panel__options-common__parameters'>
      <dimensions data={props.data.dimensions} />
      <Square className='divider-horizontal' />
      <Speed data={props.data.speed} />
      {(!props.data.isTurnedOn || props.data.isRunning) && <Square className='controller__panel__options-common__parameters--disabled' />}
    </Square>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.data.dimensions.dimensions === nextProps.data.dimensions.dimensions &&
    prevProps.data.speed.speed === nextProps.data.speed.speed &&
    prevProps.data.isTurnedOn === nextProps.data.isTurnedOn &&
    prevProps.data.isRunning === nextProps.data.isRunning
  ) return true;

}

export default React.memo(OptionsParameters, areEqual);