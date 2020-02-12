import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import {
  ControlKeys2P,
  ControlKeys3P,
  ControlKeys4P
} from '../../../interfaces/games/floating-point';

import { ControlKeys } from '../../../types/games/floating-point';

import {
  ContextGame,
  ContextPlayers,
  ContextParams,
  ContextFP,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchFP
} from '../../../contexts/games/floating-point';

let handlePointInterval: number;

const controlKeys2P: ControlKeys2P = {
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
  }
};

const controlKeys3P: ControlKeys3P = {
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
  }
};

const controlKeys4P: ControlKeys4P = {
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

const Players: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchFP = useContext(ContextDispatchFP);

  const dimensions: number = statesParams.dimensions;
  const players = statesGame.players;
  const playersCount: number = players.length;
  const points: Array<JSX.Element> = [];

  const PointP1 = styled.div`
    position: absolute;
    top: ${statesPlayers.P1.top}px;
    left: ${statesPlayers.P1.left}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
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

  points.push(<PointP1 key='P1' />);

  const PointP2 = styled.div`
    position: absolute;
    top: ${statesPlayers.P2.top}px;
    left: ${statesPlayers.P2.left}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
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

  points.push(<PointP2 key='P2' />);

  if (playersCount > 2) {
    const PointP3 = styled.div`
      position: absolute;
      top: ${statesPlayers.P3.top}px;
      left: ${statesPlayers.P3.left}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
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

    points.push(<PointP3 key='P3' />);
  }

  if (playersCount > 3) {
    const PointP4 = styled.div`
      position: absolute;
      top: ${statesPlayers.P4.top}px;
      left: ${statesPlayers.P4.left}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
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

    points.push(<PointP4 key='P4' />);
  }

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      const fPTop = statesFP.top;
      const fPLeft = statesFP.left;

      players.forEach((_, index) => {
        const player = 'P' + index;
        const playerTop = statesPlayers[player].top;
        const playerLeft = statesPlayers[player].left;

        if (
          (playerTop >= fPTop || playerTop + dimensions >= fPTop) &&
          playerTop <= fPTop + 50 &&
          (playerLeft >= fPLeft || playerLeft + dimensions >= fPLeft) &&
          playerLeft <= fPLeft + 50
        ) {
          dispatchPlayers({
            type: 'addScore',
            player
          });

          dispatchFP({
            type: 'move',
            top: Math.random() * statesGame.height[0],
            left: Math.random() * statesGame.width[0]
          });
        }
      });
    };

    if (statesGame.state === 'running') {
      matchFloatingPoint();
    }
  });

  useEffect(() => {
    const handleMove = (controlKeys): void => {
      for (const key in controlKeys) {
        const keyObj = controlKeys[key];

        if (keyObj.pressed === true) {
          const direction: string = keyObj.direction;
          const player: string = keyObj.player;
          const limit: string = keyObj.limit;
          const playerPos: number = statesPlayers[player][direction];

          if (
            (limit === 'topLeft' && playerPos > 0) ||
            (limit === 'bottom' &&
              playerPos + dimensions < statesGame.height[0]) ||
            (limit === 'right' && playerPos + dimensions < statesGame.width[0])
          ) {
            const operation: string = keyObj.operation;

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

    let registerKey;
    let cancelKey;

    if (statesGame.state === 'running' && handlePointInterval === undefined) {
      let controlKeys: ControlKeys;

      switch (playersCount) {
        case 2:
          controlKeys = controlKeys2P;
          break;

        case 3:
          controlKeys = controlKeys3P;
          break;

        case 4:
          controlKeys = controlKeys4P;
          break;
      }

      registerKey = (e: KeyboardEvent): void => {
        e.preventDefault();

        const key = e.key;

        if (
          controlKeys.hasOwnProperty(key) &&
          controlKeys[key].pressed !== true
        ) {
          controlKeys[key].pressed = true;
        }
      };

      cancelKey = (e: KeyboardEvent): void => {
        const key = e.key;

        if (controlKeys.hasOwnProperty(key)) {
          controlKeys[key].pressed = false;
        }
      };

      handlePointInterval = window.setInterval(
        handleMove,
        30 - 5 * statesParams.speed,
        controlKeys
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
    const recalculatePos = (): void => {
      const newHeight = statesGame.height[0];
      const newWidth = statesGame.width[0];
      const oldHeight = statesGame.height[1];
      const oldWidth = statesGame.width[1];

      players.forEach((_, index) => {
        const player = 'P' + index;
        const top =
          (statesPlayers[player].top / oldHeight) * 100 * (newHeight / 100);
        const left =
          (statesPlayers[player].left / oldWidth) * 100 * (newWidth / 100);

        dispatchPlayers({ type: 'recalculatePos', player, top, left });
      });

      dispatchGame({ type: 'changeState', state: 'running' });
    };

    if (statesGame.state === 'recalc') recalculatePos();
  });

  return <>{points}</>;
};

export default React.memo(Players);