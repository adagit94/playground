import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ControlKeys, Key } from '../../../types/games/floating-point';

import {
  ContextGame,
  ContextPlayers,
  ContextParams,
  ContextFP,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchFP
} from '../../../contexts/games/floating-point';

const controlKeys: ControlKeys = {
  ArrowUp: {
    operation: 'subtract',
    direction: 'top',
    player: 'P1',
    limit: 'topLeft'
  },
  ArrowRight: {
    operation: 'add',
    direction: 'left',
    player: 'P1',
    limit: 'right'
  },
  ArrowDown: {
    operation: 'add',
    direction: 'top',
    player: 'P1',
    limit: 'bottom'
  },
  ArrowLeft: {
    operation: 'subtract',
    direction: 'left',
    player: 'P1',
    limit: 'topLeft'
  },
  w: {
    operation: 'subtract',
    direction: 'top',
    player: 'P2',
    limit: 'topLeft'
  },
  d: {
    operation: 'add',
    direction: 'left',
    player: 'P2',
    limit: 'right'
  },
  s: {
    operation: 'add',
    direction: 'top',
    player: 'P2',
    limit: 'bottom'
  },
  a: {
    operation: 'subtract',
    direction: 'left',
    player: 'P2',
    limit: 'topLeft'
  },
  i: {
    operation: 'subtract',
    direction: 'top',
    player: 'P3',
    limit: 'topLeft'
  },
  l: {
    operation: 'add',
    direction: 'left',
    player: 'P3',
    limit: 'right'
  },
  k: {
    operation: 'add',
    direction: 'top',
    player: 'P3',
    limit: 'bottom'
  },
  j: {
    operation: 'subtract',
    direction: 'left',
    player: 'P3',
    limit: 'topLeft'
  },
  '8': {
    operation: 'subtract',
    direction: 'top',
    player: 'P4',
    limit: 'topLeft'
  },
  '6': {
    operation: 'add',
    direction: 'left',
    player: 'P4',
    limit: 'right'
  },
  '5': {
    operation: 'add',
    direction: 'top',
    player: 'P4',
    limit: 'bottom'
  },
  '4': {
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

  const currentHandleMove: React.MutableRefObject<Function> = useRef(null);
  const playersCount: number = statesGame.players.length;
  const dimensions: number = statesParams.dimensions;
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
    const height = statesGame.height[0];
    const width = statesGame.width[0];

    const matchFloatingPoint = (player): void => {
      const fPTop = statesFP.top;
      const fPLeft = statesFP.left;

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
          top: Math.random() * height,
          left: Math.random() * width
        });
      }
    };

    const handleMove = (): void => {
      const pressedKeys = statesPlayers.pressedKeys;
      const pressedKeysCount = pressedKeys.length;

      for (let i = 0; i < pressedKeysCount; i++) {
        const keyObj: Key = controlKeys[pressedKeys[i]];
        const direction = keyObj.direction;
        const player = keyObj.player;
        const limit = keyObj.limit;
        const playerPos: number = statesPlayers[player][direction];

        if (
          (limit === 'topLeft' && playerPos > 0) ||
          (limit === 'bottom' && playerPos + dimensions < height) ||
          (limit === 'right' && playerPos + dimensions < width)
        ) {
          const operation: string = keyObj.operation;

          dispatchPlayers({
            type: 'move',
            operation,
            direction,
            player
          });

          matchFloatingPoint(player);
        }
      }
    };

    if (statesGame.state === 'running') {
      //currentHandleMove.current = handleMove;
      handleMove();
    }
  });

  useEffect(() => {
    const recalculatePos = (): void => {
      const newHeight = statesGame.height[0];
      const newWidth = statesGame.width[0];
      const oldHeight = statesGame.height[1];
      const oldWidth = statesGame.width[1];

      for (let i = 1; i <= playersCount; i++) {
        const player = 'P' + i;
        const top =
          (statesPlayers[player].top / oldHeight) * 100 * (newHeight / 100);
        const left =
          (statesPlayers[player].left / oldWidth) * 100 * (newWidth / 100);

        dispatchPlayers({ type: 'recalculatePos', player, top, left });
      }

      dispatchGame({ type: 'changeState', state: 'running' });
    };

    if (statesGame.state === 'recalc') recalculatePos();
  });

  useEffect(() => {
    const registerKey = (e: KeyboardEvent): void => {
      e.preventDefault();

      const key = e.key;

      if (!statesPlayers.pressedKeys.includes(key) && key in controlKeys) {
        dispatchPlayers({ type: 'changePressedKeys', operation: 'add', key });
      }
    };

    const cancelKey = (e: KeyboardEvent): void => {
      const key = e.key;

      if (statesPlayers.pressedKeys.includes(key)) {
        dispatchPlayers({
          type: 'changePressedKeys',
          operation: 'remove',
          key
        });
      }
    };

    if (statesGame.state === 'running') {
      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (statesGame.state !== 'running') {
      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }
  });

  return <>{points}</>;
};

export default React.memo(Players);

// 30 - 5 * statesParams.speed
