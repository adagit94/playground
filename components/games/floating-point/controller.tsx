import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
import * as Contexts from '../../../contexts/games/floating-point';
import { ControlKeys } from '../../../interfaces/games/floating-point';

let handlePointInterval;

const monitor = {
  width: undefined,
  height: undefined
};

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

  const [statesParams, dispatchParams]: any = useReducer(
    Reducers.reducerParams,
    Inits.initParams,
    Inits.init
  );

  const [statesFP, dispatchFP]: any = useReducer(
    Reducers.reducerFP,
    Inits.initFP,
    Inits.init
  );

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
              monitorHeight - statesGame.dimensions) ||
          (controlKeys.right.includes(key) &&
            statesPlayers[player][direction] <
              monitorWidth - statesGame.dimensions)
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

  useEffect(() => {
    monitor.width = document.querySelector('#monitor').clientWidth;
    monitor.height = document.querySelector('#monitor').clientHeight;
  }, []);

  useEffect(() => {
    if (
      statesGame.isRunning === true &&
      statesGame.isPaused === false &&
      handlePointInterval === undefined
    ) {
      handlePointInterval = window.setInterval(
        handleMove,
        30 - 5 * statesGame.speed
      );

      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (
      (statesGame.isRunning === false || statesGame.isPaused === true) &&
      handlePointInterval !== undefined
    ) {
      window.clearInterval(handlePointInterval);
      handlePointInterval = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }
  });

  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextParams.Provider value={statesParams}>
            <Contexts.ContextFP.Provider value={statesFP}>
              <Contexts.ContextDispatchGame.Provider value={dispatchGame}>
                <Contexts.ContextDispatchPlayers.Provider
                  value={dispatchPlayers}
                >
                  <Contexts.ContextDispatchParams.Provider
                    value={dispatchParams}
                  >
                    <Contexts.ContextDispatchFP.Provider value={dispatchFP}>
                      <Contexts.ContextGlobals.Provider value={globals}>
                        <Monitor />
                        <DividerHorizontal />
                        <ControlPanel />
                      </Contexts.ContextGlobals.Provider>
                    </Contexts.ContextDispatchFP.Provider>
                  </Contexts.ContextDispatchParams.Provider>
                </Contexts.ContextDispatchPlayers.Provider>
              </Contexts.ContextDispatchGame.Provider>
            </Contexts.ContextFP.Provider>
          </Contexts.ContextParams.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default Controller;
