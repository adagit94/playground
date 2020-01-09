import React from 'react';

import dimensions from './dimensions';
import Speed from './Speed';

import './OptionsParameters.css';
import './Shared.css';

function OptionsParameters(props) {
  return (
    <div className='controller__panel__options-common__parameters'>
      <dimensions data={props.data.dimensions} />
      <div className='divider-horizontal' />
      <Speed data={props.data.speed} />
      {(!props.data.isTurnedOn || props.data.isRunning) && <div className='controller__panel__options-common__parameters--disabled' />}
    </div>
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