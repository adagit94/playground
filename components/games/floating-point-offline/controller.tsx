import React, { useReducer, useEffect, useRef, memo, useMemo } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from 'reducers/games/floating-point-offline';
import * as Inits from 'inits/games/floating-point-offline';
import * as Contexts from 'contexts/games/floating-point-offline';
import {
  ControlKeys,
  ControlKeys2P,
  ControlKeys3P,
  ControlKeys4P,
  DispatchesFP
} from 'types/games/floating-point-offline';

let controlKeys: ControlKeys;
let intervalHandleMove: number;

const controlKeys2P: ControlKeys2P = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P1',
    limit: 'top'
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
    limit: 'left'
  },
  w: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P2',
    limit: 'top'
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
    limit: 'left'
  }
};

const controlKeys3P: ControlKeys3P = {
  ...controlKeys2P,
  i: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P3',
    limit: 'top'
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
    limit: 'left'
  }
};

const controlKeys4P: ControlKeys4P = {
  ...controlKeys3P,
  '8': {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P4',
    limit: 'top'
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
    limit: 'left'
  }
};

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
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Controller: React.FC = (): JSX.Element => {
  const [statesGame, dispatchGame] = useReducer(
    Reducers.reducerGame,
    Inits.initGame
  );

  const [statesPlayers, dispatchPlayers] = useReducer(
    Reducers.reducerPlayers,
    Inits.initPlayers
  );

  const [statesParams, dispatchParams] = useReducer(
    Reducers.reducerParams,
    Inits.initParams
  );

  const [statesFP, dispatchFP] = useReducer(Reducers.reducerFP, Inits.initFP);

  const { players, state, width, height } = statesGame;
  const { size, speed } = statesParams;
  const { top: fPTop, left: fPLeft } = statesFP;
  const playersCount = players.length;

  const handleMoveRef = useRef(null);
  const recalculateRef = useRef(null);

  const dispatchesFP: DispatchesFP = useMemo(
    () => ({
      game: dispatchGame,
      players: dispatchPlayers,
      params: dispatchParams,
      fp: dispatchFP
    }),
    [dispatchGame, dispatchPlayers, dispatchParams, dispatchFP]
  );

  const handleMove = (): void => {
    for (const key in controlKeys) {
      if (controlKeys[key].pressed === false) continue;

      const { player, limit } = controlKeys[key];
      const { top: playerTop, left: playerLeft } = statesPlayers[player];

      switch (limit) {
        case 'top':
          if (playerTop <= 0) continue;
          break;

        case 'right':
          if (playerLeft + size >= width) continue;
          break;

        case 'bottom':
          if (playerTop + size >= height) continue;
          break;

        case 'left':
          if (playerLeft <= 0) continue;
          break;
      }

      const { operation, direction } = controlKeys[key];
      let overlap: boolean;

      for (let i = 1; i <= playersCount; i++) {
        if (player === `P${i}`) continue;

        const playerOther = `P${i}`;
        const { top: playerOtherTop, left: playerOtherLeft } = statesPlayers[
          playerOther
        ];

        if (
          (playerTop + size === playerOtherTop ||
            playerTop + size - 1 === playerOtherTop) &&
          playerLeft + size >= playerOtherLeft &&
          playerLeft <= playerOtherLeft + size
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'top',
            player
          });

          if (playerTop + size - 1 === playerOtherTop) {
            dispatchPlayers({
              type: 'move',
              operation: 'add',
              direction: 'top',
              player: playerOther
            });
          }

          overlap = true;
        } else if (
          (playerTop === playerOtherTop + size ||
            playerTop + 1 === playerOtherTop + size) &&
          playerLeft + size >= playerOtherLeft &&
          playerLeft <= playerOtherLeft + size
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'top',
            player
          });

          if (playerTop + 1 === playerOtherTop + size) {
            dispatchPlayers({
              type: 'move',
              operation: 'subtract',
              direction: 'top',
              player: playerOther
            });
          }

          overlap = true;
        } else if (
          (playerLeft + size === playerOtherLeft ||
            playerLeft + size - 1 === playerOtherLeft) &&
          playerTop + size >= playerOtherTop &&
          playerTop <= playerOtherTop + size
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'left',
            player
          });

          if (playerLeft + size - 1 === playerOtherLeft) {
            dispatchPlayers({
              type: 'move',
              operation: 'add',
              direction: 'left',
              player: playerOther
            });
          }

          overlap = true;
        } else if (
          (playerLeft === playerOtherLeft + size ||
            playerLeft + 1 === playerOtherLeft + size) &&
          playerTop + size >= playerOtherTop &&
          playerTop <= playerOtherTop + size
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'left',
            player
          });

          if (playerLeft + 1 === playerOtherLeft + size) {
            dispatchPlayers({
              type: 'move',
              operation: 'subtract',
              direction: 'left',
              player: playerOther
            });
          }

          overlap = true;
        }
      }

      if (overlap === true) continue;

      dispatchPlayers({
        type: 'move',
        operation,
        direction,
        player
      });
    }
  };

  const recalculate = (): void => {
    if (state !== 'run' && state !== 'paused') return;

    const newHeight = document.querySelector('#monitor').clientHeight;
    const newWidth = document.querySelector('#monitor').clientWidth;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;

      dispatchPlayers({
        type: 'move',
        operation: 'changePos',
        top: (statesPlayers[player].top / height) * 100 * (newHeight / 100),
        left: (statesPlayers[player].left / width) * 100 * (newWidth / 100),
        player
      });
    }

    dispatchFP({
      type: 'move',
      top: (fPTop / height) * 100 * (newHeight / 100),
      left: (fPLeft / width) * 100 * (newWidth / 100)
    });
  };

  useEffect(() => {
    handleMoveRef.current = handleMove;
    recalculateRef.current = recalculate;
  });

  useEffect(() => {
    const changeDimensions = (): void => {
      dispatchGame({
        type: 'changeDimensions',
        height: document.querySelector('#monitor').clientHeight,
        width: document.querySelector('#monitor').clientWidth
      });

      recalculateRef.current();
    };

    changeDimensions();
    window.addEventListener('resize', changeDimensions);

    return (): void => {
      window.removeEventListener('resize', changeDimensions);
    };
  }, []);

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      for (let i = 1; i <= playersCount; i++) {
        const player = `P${i}`;
        const { top: playerTop, left: playerLeft } = statesPlayers[player];

        if (
          playerTop + size >= fPTop &&
          playerTop <= fPTop + size &&
          playerLeft + size >= fPLeft &&
          playerLeft <= fPLeft + size
        ) {
          dispatchPlayers({
            type: 'addScore',
            player
          });

          dispatchFP({
            type: 'move',
            top: Math.min(Math.random() * height, height - size),
            left: Math.min(Math.random() * width, width - size)
          });
        }
      }
    };

    if (state === 'run') matchFloatingPoint();
  });

  useEffect(() => {
    if (state === 'run' && intervalHandleMove === undefined) {
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
        handleMoveRef.current,
        30 - 5 * speed
      );

      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (state !== 'run' && intervalHandleMove !== undefined) {
      window.clearInterval(intervalHandleMove);
      intervalHandleMove = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }

    return (): void => {
      if (intervalHandleMove !== undefined) {
        window.clearInterval(intervalHandleMove);
        intervalHandleMove = undefined;

        window.removeEventListener('keydown', registerKey);
        window.removeEventListener('keyup', cancelKey);
      }
    };
  });

  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextParams.Provider value={statesParams}>
            <Contexts.ContextFP.Provider value={statesFP}>
              <Monitor />
              <Contexts.ContextDispatchesFP.Provider value={dispatchesFP}>
                <ControlPanel />
              </Contexts.ContextDispatchesFP.Provider>
            </Contexts.ContextFP.Provider>
          </Contexts.ContextParams.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default memo(Controller);
