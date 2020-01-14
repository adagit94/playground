import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

const directions: Interfaces.Directions = {
  ArrowUp: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  w: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  },
  a: {
    pressed: false
  },
  i: {
    pressed: false
  },
  l: {
    pressed: false
  },
  k: {
    pressed: false
  },
  j: {
    pressed: false
  },
  '8': {
    pressed: false
  },
  '6': {
    pressed: false
  },
  '5': {
    pressed: false
  },
  '4': {
    pressed: false
  }
};



const Players = (): JSX.Element => {
  const stateGame = useContext(ContextGame);
  const statePlayers = useContext(ContextPlayers);
  const stateFp = useContext(ContextFp);

  const PointP1 = styled.div`
    position: absolute;
    top: ${statePlayers.P1.top};
    left: ${statePlayers.P1.left};
    width: ${stateGame.dimensions}px;
    height: ${stateGame.dimensions}px;
    background-color: ${statePlayers.P1.color};
    visibility: ${stateGame.visibility};
    border-radius: ${statePlayers.P1.shape === 'circle' ||
    statePlayers.P1.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statePlayers.P1.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statePlayers.P1.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP2 = styled.div`
    position: absolute;
    top: ${statePlayers.P2.top};
    left: ${statePlayers.P2.left};
    width: ${stateGame.dimensions}px;
    height: ${stateGame.dimensions}px;
    background-color: ${statePlayers.P2.color};
    visibility: ${stateGame.visibility};
    border-radius: ${statePlayers.P2.shape === 'circle' ||
    statePlayers.P2.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statePlayers.P2.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statePlayers.P2.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP3 = styled.div`
    position: absolute;
    top: ${statePlayers.P3.top};
    left: ${statePlayers.P3.left};
    width: ${stateGame.dimensions}px;
    height: ${stateGame.dimensions}px;
    background-color: ${statePlayers.P3.color};
    visibility: ${stateGame.visibility};
    border-radius: ${statePlayers.P3.shape === 'circle' ||
    statePlayers.P3.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statePlayers.P3.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statePlayers.P3.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP4 = styled.div`
    position: absolute;
    top: ${statePlayers.P4.top};
    left: ${statePlayers.P4.left};
    width: ${stateGame.dimensions}px;
    height: ${stateGame.dimensions}px;
    background-color: ${statePlayers.P4.color};
    visibility: ${stateGame.visibility};
    border-radius: ${statePlayers.P4.shape === 'circle' ||
    statePlayers.P4.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statePlayers.P4.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statePlayers.P4.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  useEffect(() => {
    matchFloatingPoint();
  });

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
