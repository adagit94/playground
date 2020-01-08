import React from 'react';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';


function ControlPanel(props) {
  const dataPlayer = props.data.player;
  const dataCommon = props.data.common;
  return (
    <div className='controller__panel'>
      <OptionsPlayer data={dataPlayer} id='P1' />
      <OptionsPlayer data={dataPlayer} id='P3' />
      <OptionsCommon data={dataCommon} />
      <OptionsPlayer data={dataPlayer} id='P4' />
      <OptionsPlayer data={dataPlayer} id='P2' />
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.data.player.isTurnedOn === nextProps.data.player.isTurnedOn &&
    prevProps.data.player.isRunning === nextProps.data.player.isRunning &&
    prevProps.data.common.buttons.play.isPaused === nextProps.data.common.buttons.play.isPaused &&
    prevProps.data.common.parameters.dimensions.dimensions === nextProps.data.common.parameters.dimensions.dimensions &&
    prevProps.data.common.parameters.speed.speed === nextProps.data.common.parameters.speed.speed &&
    prevProps.data.player.P1.color.color === nextProps.data.player.P1.color.color &&
    prevProps.data.player.P1.shape.shape === nextProps.data.player.P1.shape.shape &&
    prevProps.data.player.P2.color.color === nextProps.data.player.P2.color.color &&
    prevProps.data.player.P2.shape.shape === nextProps.data.player.P2.shape.shape &&
    prevProps.data.player.P3.color.color === nextProps.data.player.P3.color.color &&
    prevProps.data.player.P3.shape.shape === nextProps.data.player.P3.shape.shape &&
    prevProps.data.player.P4.color.color === nextProps.data.player.P4.color.color &&
    prevProps.data.player.P4.shape.shape === nextProps.data.player.P4.shape.shape &&
    prevProps.data.player.shapeOthers.toString() === nextProps.data.player.shapeOthers.toString()
  ) return true;
}

export default React.memo(ControlPanel, areEqual);