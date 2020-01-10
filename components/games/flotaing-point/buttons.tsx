import React from 'react';

import Play from './Play.js';
import Reset from './Reset.js';

import './Buttons.css';
import './Shared.css';

function Buttons(props) {
  return (
    <Square className='controller__panel__options-common__buttons'>
      <Play data={props.data.play} />
      <Square className='divider-vertical' />
      <Reset data={props.data.reset} />
      {!props.data.isTurnedOn && <Square className='controller__panel__options-common__buttons--disabled' />}
    </Square>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.data.isTurnedOn === nextProps.data.isTurnedOn &&
    prevProps.data.play.isPaused === nextProps.data.play.isPaused &&
    prevProps.data.play.isRunning === nextProps.data.play.isRunning
  ) return true;
}

export default React.memo(Buttons, areEqual);