import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
import * as Contexts from '../../../contexts/games/floating-point';
import { ControlKeys } from '../../../interfaces/games/floating-point';

let handlePointInterval;
let containerWidth: number;
let containerHeight: number;
const topLeftSubtract = ['ArrowUp', 'ArrowLeft', 'w', 'a', 'i', 'j', '8', '4'];
const topAdd = ['ArrowDown', 's', 'k', '5'];
const leftAdd = ['ArrowRight', 'd', 'l', '6'];
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
  }
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

  const [statesFP, dispatchFP]: any = useReducer(
    Reducers.reducerFP,
    Inits.initFP,
    Inits.init
  );

  const moveFP = (): void => {
    const top: number = Math.random() * containerHeight;
    const left: number = Math.random() * containerWidth;

    dispatchFP({
      type: 'move',
      top,
      left
    });
  };
  console.log(controlKeys['ArrowUp'].pressed);
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

        moveFP();
      }
    }
  };

  const handleMove = (): void => {
    for (const key in controlKeys) {
      if (controlKeys[key].pressed === true) {
        const operation = controlKeys[key].operation;
        const direction = controlKeys[key].direction;
        const player = controlKeys[key].player;

        if (topLeftSubtract.includes(key)) {
          statesPlayers[player][direction] > 0;
        } else if (topAdd.includes(key)) {
          statesPlayers[player][direction] < containerHeight - statesGame.dimensions
        }else if (leftAdd.includes(key)) {
            statesPlayers[player][direction] < containerWidth - statesGame.dimensions
          }
        }
        dispatchPlayers({
          type: 'move',
          operation,
          direction,
          player
        });
      }
    }
  };

  const handlePlay = (): void => {
    let playable = true;

    for (let i = 1; i <= statesGame.players; i++) {
      if (statesPlayers['P' + i].shape === '') {
        dispatchPlayers({
          type: 'changeShape',
          operation: '',
          player: ['P' + i],
          shape: undefined
        });
      }
      if (
        statesPlayers['P' + i].shape === '' ||
        statesPlayers['P' + i].shape === undefined
      ) {
        playable = false;
      }
    }

    if (playable === false) return;

    const topP1P2: number = containerHeight / 2 - statesGame.dimensions / 2;
    const leftP3P4: number = containerWidth / 2 - statesGame.dimensions / 2;
    const leftP2: number = containerWidth - statesGame.dimensions;
    const topP4: number = containerHeight - statesGame.dimensions;

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

    moveFP();
  };

  useEffect(() => {
    containerWidth = document.querySelector('#monitor').clientWidth;
    containerHeight = document.querySelector('#monitor').clientHeight;
  }, []);

  useEffect(() => {
    if (statesGame.isRunning === true && handlePointInterval === undefined) {
      handlePointInterval = window.setInterval(
        handleMove,
        30 - 5 * statesGame.speed
      );

      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (
      statesGame.isRunning === false &&
      handlePointInterval !== undefined
    ) {
      window.clearInterval(handlePointInterval);
      handlePointInterval = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }
  });
  //console.log(handlePointInterval);
  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextFP.Provider value={statesFP}>
            <Contexts.ContextDispatchGame.Provider value={dispatchGame}>
              <Contexts.ContextDispatchPlayers.Provider value={dispatchPlayers}>
                <Contexts.ContextDispatchFP.Provider value={dispatchFP}>
                  <Contexts.ContextCallbacks.Provider
                    value={{
                      matchFloatingPoint,
                      handlePlay
                    }}
                  >
                    <Monitor />
                    <DividerHorizontal />
                    <ControlPanel />
                  </Contexts.ContextCallbacks.Provider>
                </Contexts.ContextDispatchFP.Provider>
              </Contexts.ContextDispatchPlayers.Provider>
            </Contexts.ContextDispatchGame.Provider>
          </Contexts.ContextFP.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default Controller;
