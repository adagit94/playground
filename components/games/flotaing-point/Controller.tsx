import React, { useReducer } from 'react';
import styled from 'styled-components';

import Monitor from './Monitor';
import ControlPanel from './control-panel';
import * as Interfaces from '../../../interfaces/games/floating-point';

let handlePointInterval;
const players = 4;
const directions: Interfaces.Directions = {
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

const initStates: Interfaces.InitStates = {
  isTurnedOn: false,
  isRunning: false,
  isPaused: false,
  mode: 'fP',
  dimensions: undefined,
  speed: undefined,
  visibility: 'hidden',
  players: {
    P1: {
      positions: {
        top: 0,
        left: 0
      },
      shape: 'circle',
      color: defaults.P1.color,
      score: 0
    },
    P2: {
      positions: {
        top: 0,
        left: 0
      },
      shape: 'square',
      color: defaults.P2.color,
      score: 0
    },
    P3: {
      positions: {
        top: 0,
        left: 0
      },
      shape: 'rhombus',
      color: defaults.P3.color,
      score: 0
    },
    P4: {
      positions: {
        top: 0,
        left: 0
      },
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
  },
  fP: {
    top: 0,
    left: 0
  }
};

function registerKey(e): void {
  e.preventDefault();

  const key = e.key;

  if ({}.hasOwnProperty.call(directions, key)) {
    directions[key].pressed = true;
  }
}

function cancelKey(e): void {
  const key = e.key;

  if ({}.hasOwnProperty.call(directions, key)) {
    directions[key].pressed = false;
  }
}

function init(initStates: Interfaces.InitStates): object {
  return initStates;
}

function reducer(state, action): object {
  switch (action.type) {
    case 'switchOn':
      return {
        isTurnedOn: !state.isTurnedOn,
        dimensions: defaults.dimensions,
        speed: defaults.speed
      };

    case 'switchOff':
      return init(initStates);

    case 'changedimensions':
      return {
        dimensions: action.dimensions
      };

    case 'changeSpeed':
      return {
        speed: action.speed
      };

    case 'changeShape':
      return {
        players: {
          [action.player]: {
            shape: action.shape
          },
          shapesOthers:
            action.others === 'change'
              ? state.players.shapesOthers
                  .filter(el => {
                    return el !== state.players[action.player].shape;
                  })
                  .push(action.shape)
              : action.others === 'add'
              ? [...state.players.shapesOthers, action.shape]
              : state.players.shapesOthers.filter(el => {
                  return el !== action.shape;
                })
        }
      };

    case 'changeColor':
      return {
        players: {
          [action.player]: {
            color: action.color
          },
          colorsOthers: state.players.colorsOthers
            .filter(el => {
              return el !== state.players[action.player].color;
            })
            .push(action.color)
        }
      };

    case 'initGame':
      return {
        isRunning: !state.isRunning,
        visibility: 'visible',
        players: {
          P1: {
            positions: {
              top: action.topP1P2,
              left: defaults.fpPadding
            }
          },
          P2: {
            positions: {
              top: action.topP1P2,
              left: action.leftP2 - defaults.fpPadding
            }
          },
          P3: {
            positions: {
              top: defaults.fpPadding,
              left: action.leftP3P4
            }
          },
          P4: {
            positions: {
              top: action.topP4 - defaults.fpPadding,
              left: action.leftP3P4
            }
          }
        }
      };
    case 'resetGame':
      return {
        isRunning: false,
        isPaused: false,
        visibility: 'hidden',
        dimensions: 10,
        speed: 1,
        players: {
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
        }
      };

    case 'pauseGame':
      return {
        isPaused: !state.isPaused
      };

    case 'moveFP':
      return {
        fP: {
          top: action.positions.top,
          left: action.positions.left
        }
      };

    case 'movePlayer':
      return {
        players: {
          [action.player]: {
            positions: {
              [action.direction]:
                action.operation === 'add'
                  ? state.players[action.player].positions[action.direction] + 1
                  : state.players[action.player].positions[action.direction] - 1
            }
          }
        }
      };

    case 'addScore':
      return {
        players: {
          [action.player]: {
            score: state.players[action.player].score + 1
          }
        }
      };

    default:
      throw new Error('Unspecified action');
  }
}

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

const FPContext = React.createContext({});

function FloatingPoint(): JSX.Element {
  const [state, dispatch]: any = useReducer(reducer, initStates, init);

  const pointContainerWidth: number = document.querySelector(
    '.controller__monitor'
  ).clientWidth;

  const pointContainerHeight: number = document.querySelector(
    '.controller__monitor'
  ).clientHeight;

  function handlePoint(directions: object): void {
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
  }

  function moveFloatingPoint(): void {
    const top: number = Math.random() * pointContainerHeight;
    const left: number = Math.random() * pointContainerWidth;

    dispatch({
      type: 'moveFP',
      positions: {
        top,
        left
      }
    });
  }

  function matchFloatingPoint(): void {
    for (let i = 1; i <= players; i++) {
      if (
        (state.players['P' + i].positions.top >= state.fP.top ||
          state.players['P' + i].positions.top + state.dimensions >=
            state.fP.top) &&
        state.players['P' + i].positions.top <= state.fP.top + 50 &&
        (state.players['P' + i].positions.left >= state.fP.left ||
          state.players['P' + i].positions.left + state.dimensions >=
            state.fP.left) &&
        state.players['P' + i].positions.left <= state.fP.left + 50
      ) {
        // otestovat zdali dochazi k davkovemu prerenderovani po zmene vice stavu
        dispatch({
          type: 'addScore',
          player: 'P' + i
        });
        moveFloatingPoint();
      }
    }
  }

  function handleSwitch(): void {
    if (!state.isTurnedOn) {
      dispatch({ type: 'switchOn' });
    } else {
      dispatch({ type: 'switchOff' });
    }
  }

  function initializeMode(): void {
    switch (state.mode) {
      case 'fP':
        moveFloatingPoint();
        break;
      default:
        throw new Error('Unspecified mode');
    }
  }

  function handlePlay(reset = false): void {
    if (!state.isRunning && !reset) {
      for (let i = 1; i <= players; i++) {
        if (state.players['P' + i].shape === undefined) return;
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

      initializeMode();
    } else if (!state.isPaused || reset) {
      window.clearInterval(handlePointInterval);
      document.removeEventListener('keydown', registerKey);
      document.removeEventListener('keyup', cancelKey);

      if (reset) {
        dispatch({ type: 'resetGame' });
      } else {
        dispatch({ type: 'pauseGame' });
      }
    } else {
      handlePointInterval = window.setInterval(
        handlePoint,
        30 - state.speed * 5,
        directions
      );
      document.addEventListener('keydown', registerKey);
      document.addEventListener('keyup', cancelKey);

      dispatch({ type: 'pauseGame' });
    }
  }

  return (
    <Container>
      <FPContext.Provider value={{ state, dispatch, matchFloatingPoint }}>
        <Monitor />
        <DividerHorizontal />
        <ControlPanel />
      </FPContext.Provider>
    </Container>
  );
}

export default React.memo(FloatingPoint);
