import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { ControlKeys } from '../../../interfaces/games/floating-point';
import { initPlayers, init } from '../../../inits/games/floating-point';
import { reducerPlayers } from '../../../reducers/games/floating-point';
import {
  ContextGame,
  ContextParams,
  ContextDispatchGame
} from '../../../contexts/games/floating-point';

let handlePointInterval;

const controlKeys: ControlKeys = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P1'
  },
  ArrowRight: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P1'
  },
  ArrowDown: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P1'
  },
  ArrowLeft: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P1'
  },
  w: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P2'
  },
  d: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P2'
  },
  s: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P2'
  },
  a: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P2'
  },
  i: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P3'
  },
  l: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P3'
  },
  k: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P3'
  },
  j: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P3'
  },
  '8': {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P4'
  },
  '6': {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P4'
  },
  '5': {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P4'
  },
  '4': {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P4'
  },
  topLeft: ['ArrowUp', 'ArrowLeft', 'w', 'a', 'i', 'j', '8', '4'],
  bottom: ['ArrowDown', 's', 'k', '5'],
  right: ['ArrowRight', 'd', 'l', '6']
};

const registerKey = (e): void => {
  e.preventDefault();

  const key = e.key;

  if (controlKeys.hasOwnProperty(key) && controlKeys[key].pressed !== true) {
    controlKeys[key].pressed = true;
  }
};

const cancelKey = (e): void => {
  const key = e.key;

  if (controlKeys.hasOwnProperty(key)) {
    controlKeys[key].pressed = false;
  }
};

const Players = ({ statesFP, dispatchFP }): JSX.Element => {
  const [statesPlayers, dispatchPlayers]: any = useReducer(
    reducerPlayers,
    initPlayers,
    init
  );

  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatchGame = useContext(ContextDispatchGame);

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
      for (let i = 1; i <= statesGame.players; i++) {
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
            top: Math.random() * statesGame.width,
            left: Math.random() * statesGame.height
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
          const direction = controlKeys[key].direction;
          const player = controlKeys[key].player;

          if (
            (controlKeys.topLeft.includes(key) &&
              statesPlayers[player][direction] > 0) ||
            (controlKeys.bottom.includes(key) &&
              statesPlayers[player][direction] <
                statesGame.height - statesParams.dimensions) ||
            (controlKeys.right.includes(key) &&
              statesPlayers[player][direction] <
                statesGame.width - statesParams.dimensions)
          ) {
            const operation = controlKeys[key].operation;

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

  useEffect(() => {
    if (statesGame.state === 'init') {
      const topP1P2: number =
        statesGame.height / 2 - statesParams.dimensions / 2;
      const leftP3P4: number =
        statesGame.width / 2 - statesParams.dimensions / 2;
      const leftP2: number = statesGame.width - statesParams.dimensions;
      const topP4: number = statesGame.height - statesParams.dimensions;

      dispatchPlayers({
        type: 'init',
        topP1P2,
        leftP3P4,
        leftP2,
        topP4
      });

      dispatchFP({
        type: 'move',
        top: Math.random() * statesGame.height,
        left: Math.random() * statesGame.width
      });

      dispatchGame({
        type: 'changeState',
        state: 'running'
      });
    }
  });
  console.log(statesPlayers.P1);
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
