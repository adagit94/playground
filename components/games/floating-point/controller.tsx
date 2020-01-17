import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import { Directions } from '../../../interfaces/games/floating-point';
import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
import * as Contexts from '../../../contexts/games/floating-point';

let handlePointInterval;
let containerWidth: number;
let containerHeight: number;
const directions: Directions = {
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

const registerKey = (e): void => {
  e.preventDefault();

  const key = e.key;

  if ({}.hasOwnProperty.call(directions, key)) {
    directions[key].pressed = true;
  }
};

const cancelKey = (e): void => {
  const key = e.key;

  if ({}.hasOwnProperty.call(directions, key)) {
    directions[key].pressed = false;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const DividerHorizontal = styled.div`
  height: 2px;
  margin: 10 0px;
  background-color: #000000;
`;

const Controller = (): JSX.Element => {
  const [statesGame, dispatchGame]: any = useReducer(
    Reducers.reducerGame,
    Inits.initGame,
    Inits.init
  );
  const [statesPlayers, dispatchPlayers]: any = useReducer(
    Reducers.reducerPlayers,
    Inits.initPlayers,
    Inits.init
  );

  const [statesFp, dispatchFp]: any = useReducer(
    Reducers.reducerFp,
    Inits.initFp,
    Inits.init
  );

  const matchFloatingPoint = (): void => {
    for (let i = 1; i <= 4; i++) {
      if (
        (statesPlayers['P' + i].top >= statesFp.top ||
          statesPlayers['P' + i].top + statesGame.dimensions >= statesFp.top) &&
        statesPlayers['P' + i].top <= statesFp.top + 50 &&
        (statesPlayers['P' + i].left >= statesFp.left ||
          statesPlayers['P' + i].left + statesGame.dimensions >=
            statesFp.left) &&
        statesPlayers['P' + i].left <= statesFp.left + 50
      ) {
        const top: number = Math.random() * containerHeight;
        const left: number = Math.random() * containerWidth;

        dispatchPlayers({
          type: 'addScore',
          player: 'P' + i
        });

        dispatchFp({
          type: 'move',
          top,
          left
        });
      }
    }
  };

  const handlePlay = (): void => {
    if (!statesGame.isRunning) {
      for (let i = 1; i <= 4; i++) {
        if (statesPlayers['P' + i].shape === undefined) return;
      }

      const topP1P2: number = containerHeight / 2 - statesGame.dimensions / 2;
      const leftP3P4: number = containerWidth / 2 - statesGame.dimensions / 2;
      const leftP2: number = containerWidth - statesGame.dimensions;
      const topP4: number = containerHeight - statesGame.dimensions;

      handlePointInterval = window.setInterval(
        matchFloatingPoint,
        30 - statesGame.speed * 5,
        directions
      );

      document.addEventListener('keydown', registerKey);
      document.addEventListener('keyup', cancelKey);

      dispatchGame({
        type: 'init'
      });

      dispatchPlayers({
        type: 'init',
        topP1P2,
        leftP3P4,
        leftP2,
        topP4
      });
    }
  };

  const handleReset = (): void => {
    window.clearInterval(handlePointInterval);

    document.removeEventListener('keydown', registerKey);
    document.removeEventListener('keyup', cancelKey);

    dispatchGame({ type: 'reset' });
    dispatchPlayers({ type: 'reset' });
  };

  const handleMove = (): void => {
    const pressedKeys: Array<string> = [];

    for (const direction in directions) {
      if (directions[direction].pressed === true) pressedKeys.push(direction);
    }

    if (pressedKeys.length > 0) {
      const rightLimit: number = containerWidth - statesGame.dimensions;
      const bottomLimit: number = containerHeight - statesGame.dimensions;

      for (let i = 0; i < pressedKeys.length; i++) {
        if (
          pressedKeys[i] === 'ArrowUp' &&
          statesPlayers.P1.positions.top > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowRight' &&
          statesPlayers.P1.positions.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'ArrowDown' &&
          statesPlayers.P1.positions.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowLeft' &&
          statesPlayers.P1.positions.left > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'w' &&
          statesPlayers.P2.positions.top > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P2',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'd' &&
          statesPlayers.P2.positions.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            player: 'P2',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 's' &&
          statesPlayers.P2.positions.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move+',
            player: 'P2',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'a' &&
          statesPlayers.P2.positions.left > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P2',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'i' &&
          statesPlayers.P3.positions.top > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'l' &&
          statesPlayers.P3.positions.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'k' &&
          statesPlayers.P3.positions.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'j' &&
          statesPlayers.P3.positions.left > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '8' &&
          statesPlayers.P4.positions.top > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '6' &&
          statesPlayers.P4.positions.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P4',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '5' &&
          statesPlayers.P4.positions.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '4' &&
          statesPlayers.P4.positions.left > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P4',
            direction: 'left'
          });
        }
      }
    }
  };

  useEffect(() => {
    containerWidth = document.querySelector('#monitor').clientWidth;
    containerHeight = document.querySelector('#monitor').clientHeight;
  }, []);

  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextFp.Provider value={statesFp}>
            <Contexts.ContextDispatchGame.Provider value={dispatchGame}>
              <Contexts.ContextDispatchPlayers.Provider value={dispatchPlayers}>
                <Contexts.ContextDispatchFp.Provider value={dispatchFp}>
                  <Contexts.ContextCallbacks.Provider
                    value={{
                      matchFloatingPoint,
                      handlePlay,
                      handleReset,
                      handleMove
                    }}
                  >
                    <Monitor />
                    <DividerHorizontal />
                    <ControlPanel />
                  </Contexts.ContextCallbacks.Provider>
                </Contexts.ContextDispatchFp.Provider>
              </Contexts.ContextDispatchPlayers.Provider>
            </Contexts.ContextDispatchGame.Provider>
          </Contexts.ContextFp.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default Controller;
