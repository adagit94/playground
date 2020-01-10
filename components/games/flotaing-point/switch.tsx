import React from 'react';

import './Switch.css';

function Switch(props) {
  const switchState = props.data.isTurnedOn ? 'controller__panel__options-common__switch controller__panel__options-common__switch--on' : 'controller__panel__options-common__switch controller__panel__options-common__switch--off';

  return (
    <Square className='controller__panel__options-common__switch-container'>
      <Square className={switchState} onClick={props.data.handleSwitch} />
    </Square>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.isTurnedOn === nextProps.data.isTurnedOn) return true;
}

export default React.memo(Switch, areEqual);