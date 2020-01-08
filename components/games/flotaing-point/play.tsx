import React from 'react';

import './Play.css';

function Play(props) {
  return (
    <div className='controller__panel__options-common__buttons__play-container'>
      <input className='controller__panel__options-common__buttons__play' onClick={() => props.data.handlePlay()} value={props.data.isPaused || !props.data.isRunning ? 'Play' : 'Pause'} type='button' />
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.isPaused === nextProps.data.isPaused && prevProps.data.isRunning === nextProps.data.isRunning) return true;
}

export default React.memo(Play, areEqual);