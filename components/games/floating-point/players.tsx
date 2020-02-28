import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextPlayers,
  ContextParams
} from '../../../contexts/games/floating-point';

const Players: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);

  const playersCount = statesGame.players.length;
  const {
    dimensions,
    P1: { shape: P1Shape },
    P2: { shape: P2Shape }
  } = statesParams;

  const points: Array<JSX.Element> = [];

  const PointP1 = styled.div`
    position: absolute;
    top: ${statesPlayers.P1.top}px;
    left: ${statesPlayers.P1.left}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: ${statesParams.P1.color};
    border-radius: ${P1Shape === 'circle' || P1Shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${P1Shape === 'rhombus'
      ? 'rotate(45deg)'
      : P1Shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  points.push(<PointP1 key='P1' />);

  const PointP2 = styled.div`
    position: absolute;
    top: ${statesPlayers.P2.top}px;
    left: ${statesPlayers.P2.left}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: ${statesParams.P2.color};
    border-radius: ${P2Shape === 'circle' || P2Shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${P2Shape === 'rhombus'
      ? 'rotate(45deg)'
      : P2Shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  points.push(<PointP2 key='P2' />);

  if (playersCount > 2) {
    const P3Shape = statesParams.P3.shape;

    const PointP3 = styled.div`
      position: absolute;
      top: ${statesPlayers.P3.top}px;
      left: ${statesPlayers.P3.left}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
      background-color: ${statesParams.P3.color};
      border-radius: ${P3Shape === 'circle' || P3Shape === 'ellipse'
        ? '100%'
        : ''};
      transform: ${P3Shape === 'rhombus'
        ? 'rotate(45deg)'
        : P3Shape === 'ellipse'
        ? 'rotateX(45deg)'
        : ''};
    `;

    points.push(<PointP3 key='P3' />);
  }

  if (playersCount > 3) {
    const P4Shape = statesParams.P4.shape;

    const PointP4 = styled.div`
      position: absolute;
      top: ${statesPlayers.P4.top}px;
      left: ${statesPlayers.P4.left}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
      background-color: ${statesParams.P4.color};
      border-radius: ${P4Shape === 'circle' || P4Shape === 'ellipse'
        ? '100%'
        : ''};
      transform: ${P4Shape === 'rhombus'
        ? 'rotate(45deg)'
        : P4Shape === 'ellipse'
        ? 'rotateX(45deg)'
        : ''};
    `;

    points.push(<PointP4 key='P4' />);
  }

  return <>{points}</>;
};

export default React.memo(Players);
