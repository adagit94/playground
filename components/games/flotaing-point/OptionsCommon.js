import React from 'react';

import Switch from './Switch';
import OptionsParameters from './OptionsParameters';
import Buttons from './Buttons';

import './OptionsCommon.css';
import './Shared.css';


function OptionsCommon(props) {
  return (
    <div className='controller__panel__options-common'>
      <Switch data={props.data.switch} />
      <div className='divider-horizontal-invisible' />
      <OptionsParameters data={props.data.parameters} />
      <div className='divider-horizontal-invisible' />
      <Buttons data={props.data.buttons} />
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.data.switch.isTurnedOn === nextProps.data.switch.isTurnedOn &&
    prevProps.data.buttons.play.isPaused === nextProps.data.buttons.play.isPaused &&
    prevProps.data.parameters.isRunning === nextProps.data.parameters.isRunning &&
    prevProps.data.parameters.dimensions.dimensions === nextProps.data.parameters.dimensions.dimensions &&
    prevProps.data.parameters.speed.speed === nextProps.data.parameters.speed.speed
  ) return true;
}

export default React.memo(OptionsCommon, areEqual);