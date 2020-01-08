import React from 'react';

import './Reset.css';

function Reset(props) {
  return (
    <div className='controller__panel__options-common__buttons__reset-container'>
      <input className='controller__panel__options-common__buttons__reset' onClick={() => props.data.handlePlay(true)} value='Reset' type='button' />
    </div>
  );
}

function areEqual() {
  return true;
}

export default React.memo(Reset, areEqual);