import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { ControlKeys } from '../../../interfaces/games/floating-point';

import {
  ContextGame,
  ContextPlayers,
  ContextParams,
  ContextFP,
  ContextDispatchPlayers,
  ContextDispatchFP
} from '../../../contexts/games/floating-point';

let handlePointInterval: number;

const controlKeys: ControlKeys = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P1',
    limit: 'topLeft'
  },
  ArrowRight: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P1',
    limit: 'right'
  },
  ArrowDown: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P1',
    limit: 'bottom'
  },
  ArrowLeft: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P1',
    limit: 'topLeft'
  },
  w: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P2',
    limit: 'topLeft'
  },
  d: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P2',
    limit: 'right'
  },
  s: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P2',
    limit: 'bottom'
  },
  a: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P2',
    limit: 'topLeft'
  },
  i: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P3',
    limit: 'topLeft'
  },
  l: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P3',
    limit: 'right'
  },
  k: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P3',
    limit: 'bottom'
  },
  j: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P3',
    limit: 'topLeft'
  },
  '8': {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P4',
    limit: 'topLeft'
  },
  '6': {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P4',
    limit: 'right'
  },
  '5': {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P4',
    limit: 'bottom'
  },
  '4': {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P4',
    limit: 'topLeft'
  }
};

const registerKey = (e: KeyboardEvent): void => {
  e.preventDefault();

  const key = e.key;

  if (controlKeys.hasOwnProperty(key) && controlKeys[key].pressed !== true) {
    controlKeys[key].pressed = true;
  }
};

const cancelKey = (e: KeyboardEvent): void => {
  const key = e.key;

  if (controlKeys.hasOwnProperty(key)) {
    controlKeys[key].pressed = false;
  }
};

const Players: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchFP = useContext(ContextDispatchFP);

  const PointP1 = styled.div`
    position: absolute;
    top: ${statesPlayers.P1.top}px;
    left: ${statesPlayers.P1.left}px;
    width: ${statesParams.dimensions}px;
    height: ${statesParams.dimensions}px;
    background-color: ${statesParams.P1.color};
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
    width: ${statesParams.dimensions}px;
    height: ${statesParams.dimensions}px;
    background-color: ${statesParams.P2.color};
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
    width: ${statesParams.dimensions}px;
    height: ${statesParams.dimensions}px;
    background-color: ${statesParams.P3.color};
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
    width: ${statesParams.dimensions}px;
    height: ${statesParams.dimensions}px;
    background-color: ${statesParams.P4.color};
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
    const matchFloatingPoint = (): void => {
      for (let i = 1; i <= statesGame.players.length; i++) {
        if (
          (statesPlayers['P' + i].top >= statesFP.top ||
            statesPlayers['P' + i].top + statesParams.dimensions >=
              statesFP.top) &&
          statesPlayers['P' + i].top <= statesFP.top + 50 &&
          (statesPlayers['P' + i].left >= statesFP.left ||
            statesPlayers['P' + i].left + statesParams.dimensions >=
              statesFP.left) &&
          statesPlayers['P' + i].left <= statesFP.left + 50
        ) {
          dispatchPlayers({
            type: 'addScore',
            player: 'P' + i
          });

          dispatchFP({
            type: 'move',
            top: Math.random() * statesGame.height,
            left: Math.random() * statesGame.width
          });
        }
      }
    };

    if (statesGame.state === 'running') {
      matchFloatingPoint();
    }
  });

  useEffect(() => {
    const handleMove = (): void => {
      for (const key in controlKeys) {
        if (controlKeys[key].pressed === true) {
          const direction: string = controlKeys[key].direction;
          const player: string = controlKeys[key].player;
          const playerPos: number = statesPlayers[player][direction];
          const dimensions: number = statesParams.dimensions;

          if (
            (controlKeys[key].limit === 'topLeft' && playerPos > 0) ||
            (controlKeys[key].limit === 'bottom' &&
              playerPos + dimensions < statesGame.height) ||
            (controlKeys[key].limit === 'right' &&
              playerPos + dimensions < statesGame.width)
          ) {
            const operation: string = controlKeys[key].operation;

            dispatchPlayers({
              type: 'move',
              operation,
              direction,
              player
            });
          }
        }
      }
    };

    if (statesGame.state === 'running' && handlePointInterval === undefined) {
      handlePointInterval = window.setInterval(
        handleMove,
        30 - 5 * statesParams.speed
      );

      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (
      statesGame.state !== 'running' &&
      handlePointInterval !== undefined
    ) {
      window.clearInterval(handlePointInterval);
      handlePointInterval = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }
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
