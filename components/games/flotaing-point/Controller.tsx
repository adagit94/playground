import React, { useReducer } from 'react';
import styled from 'styled-components';

import Monitor from './Monitor';
import ControlPanel from './control-panel';
import * as Interfaces from '../../../interfaces/games/floating-point';

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
  mode: 'fp',
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
  FP: {
    top: 0,
    left: 0
  }
};

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

    case 'changeDimensions':
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
          }
        }
      };

    case 'changeColor':
      return {
        players: {
          [action.player]: {
            color: action.color
          }
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

    case 'unpauseGame':
      return {
        isPaused: !state.isPaused
      };

    case 'moveFP':
      return {
        FP: {
          top: action.positions.top,
          left: action.positions.left
        }
      };

    case 'movePlayer+':
      return {
        players: {
          [action.player]: {
            positions: {
              [action.direction]:
                state.players[action.player].positions[action.direction] + 1
            }
          }
        }
      };

    case 'movePlayer-':
      return {
        players: {
          [action.player]: {
            positions: {
              [action.direction]:
                state.players[action.player].positions[action.direction] - 1
            }
          }
        }
      };

    case 'addScore':
      return {
        players: {
          [action.player]: {
            score: players[action.player].score + 1
          }
        }
      };

    case 'addShape':
      return {
        players: {
          shapesOthers: [...state.players.shapesOthers, action.shape]
        }
      };

    case 'addColor':
      return {
        players: {
          colorsOthers: [...state.players.colorsOthers, action.color]
        }
      };

    case 'removeShape':
      return {
        players: {
          shapesOthers: state.players.shapesOthers.filter(el => {
            return el !== action.shape;
          })
        }
      };

    case 'removeColor':
      return {
        players: {
          colorsOthers: state.players.colorsOthers.filter(el => {
            return el !== action.color;
          })
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

function FloatingPoint() {
  let handlePointInterval;
  const [state, dispatch]: any = useReducer(reducer, initStates, init);
  const { mode, dimensions, speed, FP } = state;

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
      const rightLimit: number = pointContainerWidth - dimensions;
      const bottomLimit: number = pointContainerHeight - dimensions;

      for (let i = 0; i < pressedKeys.length; i++) {
        if (
          pressedKeys[i] === 'ArrowUp' &&
          state.players.P1.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer-',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowRight' &&
          state.players.P1.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'ArrowDown' &&
          state.players.P1.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P1',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'ArrowLeft' &&
          state.players.P1.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer-',
            player: 'P1',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'w' &&
          state.players.P2.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer-',
            player: 'P2',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'd' &&
          state.players.P2.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer+',
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
            type: 'movePlayer-',
            player: 'P2',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'i' &&
          state.players.P3.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer-',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'l' &&
          state.players.P3.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === 'k' &&
          state.players.P3.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P3',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === 'j' &&
          state.players.P3.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer-',
            player: 'P3',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '8' &&
          state.players.P4.positions.top > 0
        ) {
          dispatch({
            type: 'movePlayer-',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '6' &&
          state.players.P4.positions.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P4',
            direction: 'left'
          });
        } else if (
          pressedKeys[i] === '5' &&
          state.players.P4.positions.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P4',
            direction: 'top'
          });
        } else if (
          pressedKeys[i] === '4' &&
          state.players.P4.positions.left > 0
        ) {
          dispatch({
            type: 'movePlayer-',
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
        (state.players['P' + i].positions.top >= FP.top ||
          state.players['P' + i].positions.top + dimensions >= FP.top) &&
        state.players['P' + i].positions.top <= FP.top + 50 &&
        (state.players['P' + i].positions.left >= FP.left ||
          state.players['P' + i].positions.left + dimensions >= FP.left) &&
        state.players['P' + i].positions.left <= FP.left + 50
      ) {
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

  function handlePlay(reset = false): void {
    if (!state.isRunning && !reset) {
      for (let i = 1; i <= players; i++) {
        if (state.players['P' + i].shape === undefined) return;
      }
      const topP1P2: number = pointContainerHeight / 2 - dimensions / 2;
      const leftP3P4: number = pointContainerWidth / 2 - dimensions / 2;
      const leftP2: number = pointContainerWidth - dimensions;
      const topP4: number = pointContainerHeight - dimensions;

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

      dispatch({ type: 'unpauseGame' });
    }
  }

  function initializeMode(): void {
    switch (mode) {
      case 'fp':
        moveFloatingPoint();
        break;
      default:
        console.log('Choose mode!');
    }
  }

  function registerKey(e): void {
    e.preventDefault();

    const key = e.key;

    if (directions.hasOwnProperty(key)) directions[key].pressed = true;
  }

  function cancelKey(e): void {
    const key = e.key;

    if (directions.hasOwnProperty(key)) directions[key].pressed = false;
  }

  function addShape(shape): void {
    dispatch({
      type: 'addShape',
      shape
    });
  }

  function removeShape(shape): void {
    dispatch({
      type: 'addShape',
      shape
    });
  }

  function handleShape(shape: string, player: string): void {
    if (
      state.players.shapesOthers.indexOf(shape) === -1 &&
      state.players[player].shape === ''
    ) {
      addShape(shape);
      dispatch({
        type: 'changeShape',
        player,
        shape
      });
    } else if (
      state.players.shapesOthers.indexOf(shape) === -1 &&
      state.players[player].shape !== ''
    ) {
      removeShape(state.players[player].shape);
      addShape(shape);
      dispatch({
        type: 'changeShape',
        player,
        shape
      });
    } else {
      removeShape(shape);
      dispatch({
        type: 'changeShape',
        player,
        shape: ''
      });
    }
  }

  function addColor(color): void {
    dispatch({
      type: 'addColor',
      color
    });
  }

  function removeColor(color): void {
    dispatch({
      type: 'removeColor',
      color
    });
  }

  function handleColor(color: string, player: string): void {
    if (state.players.colorsOthers.indexOf(color) === -1) {
      removeColor(color);
      addColor(color);
      dispatch({
        type: 'changeColor',
        player,
        color
      });
    }
  }

  function handleDimensions(dimensions: number): void {
    dispatch({
      type: 'changeDimensions',
      dimensions
    });
  }

  function handleSpeed(speed: number): void {
    dispatch({
      type: 'changeSpeed',
      speed
    });
  }
  const data = {
    monitor: {
      players: state.players,
      FP: state.FP,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
      dimensions: state.dimensions,
      visibility: state.visibility,
      matchFloatingPoint: matchFloatingPoint
    },
    controlPanel: {
      players: state.players,
      isTurnedOn: state.isTurnedOn,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
      dimensions: state.dimensions,
      speed: state.speed,
      handleSwitch: handleSwitch,
      handleDimensions: handleDimensions,
      handleSpeed: handleSpeed,
      handlePlay: handlePlay,
      handleShape: handleShape,
      handleColor: handleColor
    }
  };
  const MonitorContext = React.createContext(data.monitor);

  const ControlPanelContext = React.createContext(data.controlPanel);

  return (
    <Container>
      <MonitorContext.Provider value={data.monitor}>
        <Monitor />
      </MonitorContext.Provider>
      <ControlPanelContext.Provider value={data.controlPanel}>
        <DividerHorizontal />>
      </ControlPanelContext.Provider>
      <ControlPanel />
    </Container>
  );
}

export default Controller;
