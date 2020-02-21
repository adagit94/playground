import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import {
  Key,
  ControlKeys,
  ControlKeys2P,
  ControlKeys3P,
  ControlKeys4P
} from '../../../types/games/floating-point';

import {
  ContextGame,
  ContextPlayers,
  ContextParams,
  ContextFP,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchFP
} from '../../../contexts/games/floating-point';

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
  ...controlKeys2P,
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
  ...controlKeys3P,
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

let controlKeys: ControlKeys;
let intervalHandleMove: number;

const registerKey = (e: KeyboardEvent): void => {
  e.preventDefault();

  const key = e.key;

  if (key in controlKeys && controlKeys[key].pressed !== true) {
    controlKeys[key].pressed = true;
  }
};

const cancelKey = (e: KeyboardEvent): void => {
  const key = e.key;

  if (key in controlKeys) {
    controlKeys[key].pressed = false;
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

  const newHeight = statesGame.height[0];
  const newWidth = statesGame.width[0];
  const oldHeight = statesGame.height[1];
  const oldWidth = statesGame.width[1];
  const state = statesGame.state;
  const playersCount = statesGame.players.length;
  const dimensions = statesParams.dimensions;

  const refHandleMove = useRef(null);
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

  const handleMove = (): void => {
    for (const key in controlKeys) {
      const keyObj: Key = controlKeys[key];

      if (keyObj.pressed === true) {
        const direction = keyObj.direction;
        const player = keyObj.player;
        const limit = keyObj.limit;
        const playerPos: number = statesPlayers[player][direction];

        if (
          (limit === 'topLeft' && playerPos > 0) ||
          (limit === 'bottom' && playerPos + dimensions < newHeight) ||
          (limit === 'right' && playerPos + dimensions < newWidth)
        ) {
          console.log(1);
          const operation = keyObj.operation;

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

  useEffect(() => {
    const currentHandleMove = (): void => {
      refHandleMove.current();
    };

    if (state === 'running' && intervalHandleMove === undefined) {
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

      intervalHandleMove = window.setInterval(
        currentHandleMove,
        30 - 5 * statesParams.speed
      );

      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (state !== 'running' && intervalHandleMove !== undefined) {
      window.clearInterval(intervalHandleMove);
      intervalHandleMove = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }
  });

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      const fPTop = statesFP.top;
      const fPLeft = statesFP.left;

      for (let i = 1; i < playersCount; i++) {
        const player = 'P' + i;
        const playerTop = statesPlayers[player].top;
        const playerLeft = statesPlayers[player].left;

        if (
          (playerTop >= fPTop || playerTop + dimensions >= fPTop) &&
          playerTop <= fPTop + dimensions &&
          (playerLeft >= fPLeft || playerLeft + dimensions >= fPLeft) &&
          playerLeft <= fPLeft + dimensions
        ) {
          dispatchPlayers({
            type: 'addScore',
            player
          });

          dispatchFP({
            type: 'move',
            top: Math.random() * newHeight,
            left: Math.random() * newWidth
          });
        }
      }
    };

    if (state === 'running') {
      refHandleMove.current = handleMove;
      matchFloatingPoint();
    }
  });

  useEffect(() => {
    const recalculatePos = (): void => {
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

    if (state === 'recalc') recalculatePos();
  });

  return <>{points}</>;
};

export default React.memo(Players);
