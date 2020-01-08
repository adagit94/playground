import React from 'react';

import Color from './Color';
import Shape from './Shape';

import './OptionsPlayer.css';

const DividerHorizontalInvisible = styled.div`
    height: 2px;
`;

const DividerVertical = styled.div`
  width: 2px;
  margin: 0 10px;
  display: inline-block;
  background-color: #000000;
`;

const DividerVerticalInvisible = styled.div`
  width: 2px;
  display: inline-block;
`;

function OptionsPlayer(props) {
  const player = props.id;
  const dataPlayer = props.data[player];

  return (
    <div className='controller__panel__options-player-container'>
      <div className='controller__panel__options-player__heading'>
        <h3>{player}</h3>
      </div>
      <div className='controller__panel__options-player'>
        <Shape data={dataPlayer.shape} id={player} />
        <div className='divider-vertical' />
        <Color data={dataPlayer.color} id={player} />
        {(!props.data.isTurnedOn || props.data.isRunning) && <div className='controller__panel__options-player--disabled' />}
      </div>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.data.isTurnedOn === nextProps.data.isTurnedOn &&
    prevProps.data.isRunning === nextProps.data.isRunning &&
    prevProps.data[prevProps.id].color.color === nextProps.data[nextProps.id].color.color &&
    prevProps.data[prevProps.id].shape.shape === nextProps.data[nextProps.id].shape.shape &&
    prevProps.data.shapeOthers.toString() === nextProps.data.shapeOthers.toString()
  ) return true;
}

export default React.memo(OptionsPlayer, areEqual);