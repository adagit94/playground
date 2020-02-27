import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

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

const Container = styled.div`
  height: 70%;
  position: relative;
`;

const Monitor: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchFP = useContext(ContextDispatchFP);

  const state = statesGame.state;
  const newHeight = statesGame.height[0];
  const newWidth = statesGame.width[0];
  const oldHeight = statesGame.height[1];
  const oldWidth = statesGame.width[1];
  const playersCount = statesGame.players.length;
  const dimensions = statesParams.dimensions;

  const refHandleMove = useRef(null);

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
      console.log(intervalHandleMove);
    } else if (state !== 'running' && intervalHandleMove !== undefined) {
      window.clearInterval(intervalHandleMove);
      intervalHandleMove = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
      console.log(intervalHandleMove);
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

        dispatchPlayers({
          type: 'recalculatePos',
          top:
            (statesPlayers[player].top / oldHeight) * 100 * (newHeight / 100),
          left:
            (statesPlayers[player].left / oldWidth) * 100 * (newWidth / 100),
          player
        });
      }

      dispatchFP({
        type: 'move',
        top: (statesFP.top / oldHeight) * 100 * (newHeight / 100),
        left: (statesFP.left / oldWidth) * 100 * (newWidth / 100)
      });

      dispatchGame({ type: 'changeState', state: 'running' });
    };

    if (state === 'recalc') recalculatePos();
  });

  return (
    <Container id='monitor'>
      {state !== 'off' && state !== 'conf' && (
        <>
          <Players />
          <Point />
        </>
      )}
    </Container>
  );
};

export default React.memo(Monitor);
