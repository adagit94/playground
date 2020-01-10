import React from 'react';

import './Reset.css';

function Reset(props) {
  return (
    <Square className='controller__panel__options-common__buttons__reset-container'>
      <input className='controller__panel__options-common__buttons__reset' onClick={() => props.data.handlePlay(true)} value='Reset' type='button' />
    </Square>
  );
}

function areEqual() {
  return true;
}

export default React.memo(Reset, areEqual);