import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
import * as Contexts from '../../../contexts/games/floating-point';

let handlePointInterval;
let containerWidth: number;
let containerHeight: number;

const players = 4;


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

  const [statesCK, dispatchCK]: any = useReducer(
    Reducers.reducerCK,
    Inits.initCK,
    Inits.init
  );

  const registerKey = (e): void => {
    e.preventDefault();
  
    const key = e.key;
  
    if (statesCK.hasOwnProperty(key)) {
      statesCK[key].pressed = true;
    }
  };
  
  const cancelKey = (e): void => {
    const key = e.key;
  
    if (statesCK.hasOwnProperty(key)) {
      statesCK[key].pressed = false;
    }
  };

  const moveFP = (): void => {
    const top: number = Math.random() * containerHeight;
    const left: number = Math.random() * containerWidth;

    dispatchFP({
      type: 'move',
      top,
      left
    });
  };

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
    const pressedKeys: Array<string> = [];

    for (const key in statesCK) {
      if (statesCK[key].pressed === true) {
        switch ()
      };
      pressedKeys.push(direction);
    }

    if (pressedKeys.length > 0) {
      const rightLimit: number = containerWidth - statesGame.dimensions;
      const bottomLimit: number = containerHeight - statesGame.dimensions;

      pressedKeys.forEach(dir => {
        const dispatch = (): void => {
          dispatchPlayers({
            type: 'move',
            operation: statesCK[dir].operation,
            direction: statesCK[dir].direction,
            player: statesCK[dir].player
          });
        };
      });

      for (let i = 0; i < pressedKeys.length; i++) {
        if (pressedKeys[i] === 'ArrowUp' && statesPlayers.P1.top > 0) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowRight' &&
          statesPlayers.P1.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'ArrowDown' &&
          statesPlayers.P1.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowLeft' &&
          statesPlayers.P1.left > 0
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P1',
            direction: 'left'
          });
        } else if (pressedKeys[i] === 'w' && statesPlayers.P2.top > 0) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P2',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'd' &&
          statesPlayers.P2.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P2',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 's' &&
          statesPlayers.P2.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P2',
            direction: 'top'
          });
        } else if (pressedKeys[i] === 'a' && statesPlayers.P2.left > 0) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P2',
            direction: 'left'
          });
        } else if (pressedKeys[i] === 'i' && statesPlayers.P3.top > 0) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'l' &&
          statesPlayers.P3.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'k' &&
          statesPlayers.P3.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P3',
            direction: 'top'
          });
        } else if (pressedKeys[i] === 'j' && statesPlayers.P3.left > 0) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P3',
            direction: 'left'
          });
        } else if (pressedKeys[i] === '8' && statesPlayers.P4.top > 0) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '6' &&
          statesPlayers.P4.left < rightLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P4',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '5' &&
          statesPlayers.P4.top < bottomLimit
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            player: 'P4',
            direction: 'top'
          });
        } else if (pressedKeys[i] === '4' && statesPlayers.P4.left > 0) {
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

  const handlePlay = (): void => {
    let playable = true;

    for (let i = 1; i <= players; i++) {
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
          <Contexts.ContextFp.Provider value={statesFP}>
            <Contexts.ContextDispatchGame.Provider value={dispatchGame}>
              <Contexts.ContextDispatchPlayers.Provider value={dispatchPlayers}>
                <Contexts.ContextdispatchFP.Provider value={dispatchFP}>
                  <Contexts.ContextCallbacks.Provider
                    value={{
                      matchFloatingPoint,
                      handlePlay,
                      handleMove
                    }}
                  >
                    <Monitor />
                    <DividerHorizontal />
                    <ControlPanel />
                  </Contexts.ContextCallbacks.Provider>
                </Contexts.ContextdispatchFP.Provider>
              </Contexts.ContextDispatchPlayers.Provider>
            </Contexts.ContextDispatchGame.Provider>
          </Contexts.ContextFp.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default Controller;
