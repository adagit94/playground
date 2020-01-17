import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextPlayers,
  ContextCallbacks
} from '../../../contexts/games/floating-point';

const Players = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const callbacks = useContext(ContextCallbacks);

  const PointP1 = styled.div`
    position: absolute;
    top: ${statesPlayers.P1.top};
    left: ${statesPlayers.P1.left};
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesPlayers.P1.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesPlayers.P1.shape === 'circle' ||
    statesPlayers.P1.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesPlayers.P1.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesPlayers.P1.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP2 = styled.div`
    position: absolute;
    top: ${statesPlayers.P2.top};
    left: ${statesPlayers.P2.left};
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesPlayers.P2.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesPlayers.P2.shape === 'circle' ||
    statesPlayers.P2.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesPlayers.P2.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesPlayers.P2.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP3 = styled.div`
    position: absolute;
    top: ${statesPlayers.P3.top};
    left: ${statesPlayers.P3.left};
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesPlayers.P3.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesPlayers.P3.shape === 'circle' ||
    statesPlayers.P3.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesPlayers.P3.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesPlayers.P3.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP4 = styled.div`
    position: absolute;
    top: ${statesPlayers.P4.top};
    left: ${statesPlayers.P4.left};
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesPlayers.P4.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesPlayers.P4.shape === 'circle' ||
    statesPlayers.P4.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesPlayers.P4.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesPlayers.P4.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  useEffect(() => {
    callbacks.matchFloatingPoint();
  }, [callbacks, statesGame.isRunning]);

  return (
    <>
      <PointP1 />
      <PointP2 />
      <PointP3 />
      <PointP4 />
    </>
  );
};

export default React.memo(Players);
