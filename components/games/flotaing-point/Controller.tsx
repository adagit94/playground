import React, { useReducer } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';
import * as Interfaces from '../../../interfaces/games/floating-point';

let handlePointInterval;

const defaults: Interfaces.Defaults = {
  P1: {
    color: '#000000'
  },
  P2: {
    color: '#808080'
  },
  P3: {
    color: '#708090'
  },
  P4: {
    color: '#2f4f4f'
  },
  dimensions: 10,
  speed: 1,
  fpPadding: 10
};

const initGame: Interfaces.InitGame = {
  isTurnedOn: false,
  isRunning: false,
  isPaused: false,
  mode: 'fP',
  dimensions: undefined,
  speed: undefined,
  visibility: 'hidden'
};

const initPlayers: Interfaces.InitPlayers = {
  P1: {
    top: 0,
    left: 0,
    shape: 'circle',
    color: defaults.P1.color,
    score: 0
  },
  P2: {
    top: 0,
    left: 0,
    shape: 'square',
    color: defaults.P2.color,
    score: 0
  },
  P3: {
    top: 0,
    left: 0,
    shape: 'rhombus',
    color: defaults.P3.color,
    score: 0
  },
  P4: {
    top: 0,
    left: 0,
    shape: 'ellipse',
    color: defaults.P4.color,
    score: 0
  },
  shapesOthers: Array(4).fill(''),
  colorsOthers: [
    defaults.P1.color,
    defaults.P2.color,
    defaults.P3.color,
    defaults.P4.color
  ]
};

const initFp: Interfaces.InitFp = {
  top: 0,
  left: 0
};

const init: Interfaces.Initializer = initState => initState;

const reducerGame: Interfaces.Reducer = (state, action) => {
  switch (action.type) {
    case 'switchOn':
      return {
        isTurnedOn: !state.isTurnedOn,
        dimensions: defaults.dimensions,
        speed: defaults.speed
      };

    case 'switchOff':
      return init(initGame);

    case 'init':
      return {
        isRunning: !state.isRunning,
        visibility: 'visible'
      };
    case 'reset':
      return {
        isRunning: false,
        isPaused: false,
        visibility: 'hidden',
        dimensions: 10,
        speed: 1
      };

    case 'pause':
      return {
        isPaused: !state.isPaused
      };

    case 'changeDimensions':
      return {
        dimensions: action.dimensions
      };

    case 'changeSpeed':
      return {
        speed: action.speed
      };

    default:
      throw new Error('Unspecified action');
  }
};

const reducerPlayers: Interfaces.Reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        P1: {
          top: action.topP1P2,
          left: defaults.fpPadding
        },
        P2: {
          top: action.topP1P2,
          left: action.leftP2 - defaults.fpPadding
        },
        P3: {
          top: defaults.fpPadding,
          left: action.leftP3P4
        },
        P4: {
          top: action.topP4 - defaults.fpPadding,
          left: action.leftP3P4
        }
      };

    case 'reset':
      return {
        P1: {
          shape: '',
          color: defaults.P1.color
        },
        P2: {
          shape: '',
          color: defaults.P2.color
        },
        P3: {
          shape: '',
          color: defaults.P3.color
        },
        P4: {
          shape: '',
          color: defaults.P4.color
        },
        shapesOthers: Array(4).fill(''),
        colorsOthers: [
          defaults.P1.color,
          defaults.P2.color,
          defaults.P3.color,
          defaults.P4.color
        ]
      };

    case 'move':
      return {
        [action.player]: {
          positions: {
            [action.direction]:
              action.operation === 'add'
                ? state[action.player].positions[action.direction] + 1
                : state[action.player].positions[action.direction] - 1
          }
        }
      };

    case 'addScore':
      return {
        [action.player]: {
          score: state[action.player].score + 1
        }
      };
    case 'changeShape':
      return {
        [action.player]: {
          shape: action.operation === 'remove' ? '' : action.shape
        },
        shapesOthers:
          action.operation === 'add'
            ? [...state.shapesOthers, action.shape]
            : action.operation === 'remove'
            ? state.shapesOthers.filter(el => {
                return el !== state[action.player].shape;
              })
            : state.shapesOthers
                .filter(el => {
                  return el !== action.shape;
                })
                .push(action.shape)
      };

    case 'changeColor':
      return {
        [action.player]: {
          color: action.color
        },
        colorsOthers: state.colorsOthers
          .filter(el => {
            return el !== state[action.player].color;
          })
          .push(action.color)
      };

    default:
      throw new Error('Unspecified action');
  }
};

const reducerFp: Interfaces.Reducer = (state, action) => {
  switch (action.type) {
    case 'move':
      return {
        top: action.positions.top,
        left: action.positions.left
      };

    default:
      throw new Error('Unspecified action');
  }
};

const handlePlay = (): void {
  if (!state.isRunning && !reset) {
    for (let i = 1; i <= players; i++) {
      if (state['P' + i].shape === undefined) return;
    }
    const topP1P2: number = pointContainerHeight / 2 - state.dimensions / 2;
    const leftP3P4: number = pointContainerWidth / 2 - state.dimensions / 2;
    const leftP2: number = pointContainerWidth - state.dimensions;
    const topP4: number = pointContainerHeight - state.dimensions;

    handlePointInterval = window.setInterval(
      handlePoint,
      30 - state.speed * 5,
      directions
    );
    document.addEventListener('keydown', registerKey);
    document.addEventListener('keyup', cancelKey);

    dispatch({
      type: 'initGame',
      topP1P2,
      leftP3P4,
      leftP2,
      topP4
    });

    switch (state.mode) {
      case 'fP':
        moveFloatingPoint();
        break;
      default:
        throw new Error('Unspecified mode');
    }
    handlePointInterval = window.setInterval(
      handlePoint,
      30 - state.speed * 5,
      directions
    );
    document.addEventListener('keydown', registerKey);
    document.addEventListener('keyup', cancelKey);

    dispatch({ type: 'pauseGame' });
  }
};

  // nize uvedene funkce pouzit pri zapnuti, vypnuti, resetu, (od)pauzovani
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

  const handleReset = () => {
    window.clearInterval(handlePointInterval);
    document.removeEventListener('keydown', registerKey);
    document.removeEventListener('keyup', cancelKey);
  };

  const handlePoint = (directions: object): void => {
    const pointContainerWidth: number = document.querySelector('#monitor')
    .clientWidth;

  const pointContainerHeight: number = document.querySelector('#monitor')
    .clientHeight;
    const pressedKeys: Array<string> = [];

    for (const direction in directions) {
      if (directions[direction].pressed === true) pressedKeys.push(direction);
    }

    if (pressedKeys.length > 0) {
      const rightLimit: number = pointContainerWidth - state.dimensions;
      const bottomLimit: number = pointContainerHeight - state.dimensions;

      for (let i = 0; i < pressedKeys.length; i++) {
        if (
          pressedKeys[i] === 'ArrowUp' &&
          state.players.P1.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowRight' &&
          state.players.P1.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'ArrowDown' &&
          state.players.P1.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowLeft' &&
          state.players.P1.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'w' &&
          state.players.P2.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P2',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'd' &&
          state.players.P2.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer',
            player: 'P2',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 's' &&
          state.players.P2.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P2',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'a' &&
          state.players.P2.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P2',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'i' &&
          state.players.P3.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'l' &&
          state.players.P3.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'k' &&
          state.players.P3.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'j' &&
          state.players.P3.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '8' &&
          state.players.P4.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '6' &&
          state.players.P4.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P4',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '5' &&
          state.players.P4.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'add',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '4' &&
          state.players.P4.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer',
            operation: 'subtract',
            player: 'P4',
            direction: 'left'
          });
        }
      }
    }
  };

  const matchFloatingPoint = (): void => {
    for (let i = 1; i <= 4; i++) {
      if (
        (statePlayers['P' + i].top >= statefP.top ||
          statePlayers['P' + i].top + stateGame.dimensions >= statefP.top) &&
        statePlayers['P' + i].top <= statefP.top + 50 &&
        (statePlayers['P' + i].left >= statefP.left ||
          statePlayers['P' + i].left + stateGame.dimensions >= statefP.left) &&
        statePlayers['P' + i].left <= statefP.left + 50
      ) {
        const top: number = Math.random() * pointContainerHeight;
        const left: number = Math.random() * pointContainerWidth;
        dispatch({
          type: 'addScore',
          player: 'P' + i
        });
        dispatch({
          type: 'moveFP',
          positions: {
            top,
            left
          }
        });
      }
    }
  };

const ContextGame = React.createContext(null);
const ContextPlayers = React.createContext(null);
const ContextDispatchGame = React.createContext(null);
const ContextDispatchPlayers = React.createContext(null);
const ContextCallbacks = React.createContext({

});
/*const ContextGame = React.createContext(null);
const ContextDispatchGame = React.createContext(null);*/

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

const FloatingPoint = (): JSX.Element => {
  const [stateGame, dispatchGame] = useReducer(reducerGame, initGame, init);
  const [statePlayers, dispatchPlayers] = useReducer(
    reducerPlayers,
    initPlayers,
    init
  );

  const pointContainerWidth: number = document.querySelector(
    '.controller__monitor'
  ).clientWidth;

  const pointContainerHeight: number = document.querySelector(
    '.controller__monitor'
  ).clientHeight;

  return (
    <Container>
      <ContextGame.Provider value={stateGame}>
        <ContextPlayers.Provider value={statePlayers}>
          <ContextDispatchGame.Provider value={dispatchGame}>
            <ContextDispatchPlayers.Provider value={dispatchPlayers}>
              <Monitor />
              <DividerHorizontal />
              <ControlPanel />
            </ContextDispatchPlayers.Provider>
          </ContextDispatchGame.Provider>
        </ContextPlayers.Provider>
      </ContextGame.Provider>
    </Container>
  );
};

export default React.memo(FloatingPoint);
