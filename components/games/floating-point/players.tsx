import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextPlayers,
  ContextParams,
  ContextFP,
  ContextDispatchPlayers,
  ContextGlobals,
  ContextDispatchFP
} from '../../../contexts/games/floating-point';

const Players = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchFP = useContext(ContextDispatchFP);
  const globals = useContext(ContextGlobals);

  const matchFloatingPoint = (): void => {
    for (let i = 1; i <= 4; i++) {
      if (
        (statesPlayers['P' + i].top >= statesFP.top ||
          statesPlayers['P' + i].top + statesGame.dimensions >= statesFP.top) &&
        statesPlayers['P' + i].top <= statesFP.top + 50 &&
        (statesPlayers['P' + i].left >= statesFP.left ||
          statesPlayers['P' + i].left + statesGame.dimensions >=
            statesFP.left) &&
        statesPlayers['P' + i].left <= statesFP.left + 50
      ) {
        dispatchPlayers({
          type: 'addScore',
          player: 'P' + i
        });

        dispatchFP({
          top: globals.fp.top(),
          left: globals.fp.left()
        });
      }
    }
  };

  const PointP1 = styled.div`
    position: absolute;
    top: ${statesPlayers.P1.top}px;
    left: ${statesPlayers.P1.left}px;
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesParams.P1.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesParams.P1.shape === 'circle' ||
    statesParams.P1.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesParams.P1.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesParams.P1.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP2 = styled.div`
    position: absolute;
    top: ${statesPlayers.P2.top}px;
    left: ${statesPlayers.P2.left}px;
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesParams.P2.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesParams.P2.shape === 'circle' ||
    statesParams.P2.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesParams.P2.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesParams.P2.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP3 = styled.div`
    position: absolute;
    top: ${statesPlayers.P3.top}px;
    left: ${statesPlayers.P3.left}px;
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesParams.P3.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesParams.P3.shape === 'circle' ||
    statesParams.P3.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesParams.P3.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesParams.P3.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP4 = styled.div`
    position: absolute;
    top: ${statesPlayers.P4.top}px;
    left: ${statesPlayers.P4.left}px;
    width: ${statesGame.dimensions}px;
    height: ${statesGame.dimensions}px;
    background-color: ${statesParams.P4.color};
    visibility: ${statesGame.visibility};
    border-radius: ${statesParams.P4.shape === 'circle' ||
    statesParams.P4.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${statesParams.P4.shape === 'rhombus'
      ? 'rotate(45deg)'
      : statesParams.P4.shape === 'ellipse'
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
