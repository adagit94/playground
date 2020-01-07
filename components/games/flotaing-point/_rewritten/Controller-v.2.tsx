import React from 'react';

import Monitor from './Monitor';
import ControlPanel from './ControlPanel';
import * as Interfaces from '../interfaces/games/floating-point';

import './Controller.css';
import './Shared.css';

const players: number = 4;

let handlePointInterval; // dodefinovat - pravdepodobne pripravit interface pro native fci http://www.typescriptlang.org/docs/handbook/interfaces.html#function-types

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

function reducer(state, action) {
  switch(action.type) {
    case 'switchOn':
      return {
        isTurnedOn: !state.isTurnedOn,
        dimensions: defaults.dimensions,
        speed: defaults.speed
      };
    case 'switchOff':
      return {
        isTurnedOn: !state.isTurnedOn,
        isRunning: false,
        isPaused: false,
        visibility: 'hidden',
        dimensions: undefined,
        speed: undefined,
        players.shapesOthers: Array(4).fill(''),
        players.colorsOthers: [
          defaults.P1.color,
          defaults.P2.color,
          defaults.P3.color,
          defaults.P4.color
        ],
        players.P1.shape: '',
        players.P2.shape: '',
        players.P3.shape: '',
        players.P4.shape: '',
        players.P1.color: defaults.P1.color,
        players.P2.color: defaults.P2.color,
        players.P3.color: defaults.P3.color,
        players.P4.color: defaults.P4.color
      };
    case 'changeDimensions':
      return {};
    case 'changeSpeed':
      return {};
    case 'changeShape':
      return {}; // mozne actions (content) '', shape, undefined; implementovat nahrazeni pro shapesOthers
    case 'changeColor':
      return {}; // implementovat nahrazeni pro colosOthers
    case 'initGame':
      return {};
    case 'resetGame':
      return {};
    case 'pauseGame':
      return {};
    case 'unpauseGame':
      return {};
    case 'moveFP':
      return {
        FP.top: action.positions.top,
        FP.left: action.positions.left
      };
    case 'movePlayer+':
      return {
        players[action.player].positions[action.direction]: state.players[action.player].positions[action.direction] + 1
      };
    case 'movePlayer-':
      return {
        players[action.player].positions[action.direction]: state.players[action.player].positions[action.direction] - 1
      };
    case 'addScore':
      return {
        players[action.player].score: players[action.player].score + 1
      };
    default:
      throw new Error('Unspecified action');
  }
}




function FloatingPoint() {
  const [state, dispatch] = useReducer(reducer, initStates, init);
  const pointContainerWidth: number = document.querySelector('.controller__monitor')
  .clientWidth;
const pointContainerHeight: number = document.querySelector('.controller__monitor')
  .clientHeight;

  function handlePoint(directions: object): void {
    let pressedKeys: Array<string> = [];
  
    for (const direction in directions) {
      if (directions[direction].pressed === true) pressedKeys.push(direction);
    }
  
    if (pressedKeys.length > 0) {
      const pointContainerWidth: number = document.querySelector('.controller__monitor')
        .clientWidth;
      const pointContainerHeight: number = document.querySelector(
        '.controller__monitor'
      ).clientHeight;
      const dimensions: number = this.state.dimensions;
      const rightLimit: number = pointContainerWidth - dimensions;
      const bottomLimit: number = pointContainerHeight - dimensions;
  
      for (let i = 0; i < pressedKeys.length; i++) {
        if (pressedKeys[i] === 'ArrowUp' && state.players.P1.position.top > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P1',
            direction: 'top'
          })
        } else if (
          pressedKeys[i] === 'ArrowRight' &&
          state.players.P1.position.left < rightLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P1',
            direction: 'left'
          })
        } else if (
          pressedKeys[i] === 'ArrowDown' &&
          state.players.P1.position.top < bottomLimit
        ) {
          dispatch({
            type: 'movePlayer+',
            player: 'P1',
            direction: 'top'
          })
        } else if (pressedKeys[i] === 'ArrowLeft' && state.players.P1.position.left > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P1',
            direction: 'left'
          })
        } else if (pressedKeys[i] === 'w' && state.players.P2.position.top > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P2',
            direction: 'top'
          })
        } else if (pressedKeys[i] === 'd' && state.players.P2.position.left < rightLimit) {
          dispatch({
            type: 'movePlayer+',
            player: 'P2',
            direction: 'left'
          })
        } else if (pressedKeys[i] === 's' && state.players.P2.position.top < bottomLimit) {
          dispatch({
            type: 'movePlayer+',
            player: 'P2',
            direction: 'top'
          })
        } else if (pressedKeys[i] === 'a' && state.players.P2.position.left > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P2',
            direction: 'left'
          })
        } else if (pressedKeys[i] === 'i' && state.players.P3.position.top > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P3',
            direction: 'top'
          })
        } else if (pressedKeys[i] === 'l' && state.players.P3.position.left < rightLimit) {
          dispatch({
            type: 'movePlayer+',
            player: 'P3',
            direction: 'left'
          })
        } else if (pressedKeys[i] === 'k' && state.players.P3.position.top < bottomLimit) {
          dispatch({
            type: 'movePlayer+',
            player: 'P3',
            direction: 'top'
          })
        } else if (pressedKeys[i] === 'j' && state.players.P3.position.left > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P3',
            direction: 'left'
          })
        } else if (pressedKeys[i] === '8' && state.players.P4.position.top > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P4',
            direction: 'top'
          })
        } else if (pressedKeys[i] === '6' && state.players.P4.position.left < rightLimit) {
          dispatch({
            type: 'movePlayer+',
            player: 'P4',
            direction: 'left'
          })
        } else if (pressedKeys[i] === '5' && state.players.P4.position.top < bottomLimit) {
          dispatch({
            type: 'movePlayer+',
            player: 'P4',
            direction: 'top'
          })
        } else if (pressedKeys[i] === '4' && state.players.P4.position.left > 0) {
          dispatch({
            type: 'movePlayer-',
            player: 'P4',
            direction: 'left'
          })
        }
      }
    }
  }
  

function matchFloatingPoint(): void {
    const {dimensions, fpPositions} = this.state;

    for (let i = 1; i <= players; i++) {
      if (
        (state.players['P' + i].positions.top >= fpPositions.top ||
        state.players['P' + i].positions.top + dimensions >= fpPositions.top) &&
        state.players['P' + i].positions.top <= fpPositions.top + 50 &&
        (state.players['P' + i].positions.left >= fpPositions.left ||
        state.players['P' + i].positions.left + dimensions >= fpPositions.left) &&
        state.players['P' + i].positions.left <= fpPositions.left + 50
      ) {
        dispatch({
          type: 'addScore',
          player: 'P' + i
        })
        moveFloatingPoint();
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
    })
  }

function handleSwitch(): void {
    if (!state.isTurnedOn) {
      dispatch({type: 'switchOn'})
    } else {
      dispatch({type: 'switchOff'})
    }
  }

function handlePlay(reset: boolean = false) {
    if (!state.isRunning && !reset) {
      let playable: boolean = true;

      for (let i = 1; i <= players; i++) {
        if (state.players['P' + i].shape === undefined) {
          return;
      }

      const pointContainerWidth: number = document.querySelector('.controller__monitor')
        .clientWidth;
      const pointContainerHeight: number = document.querySelector(
        '.controller__monitor'
      ).clientHeight;
      const dimensions = this.state.dimensions;
      const topP1P2 = pointContainerHeight / 2 - dimensions / 2;
      const leftP3P4 = pointContainerWidth / 2 - dimensions / 2;
      const leftP2 = pointContainerWidth - dimensions;
      const topP4 = pointContainerHeight - dimensions;

      handlePointInterval = window.setInterval(
        this.handlePoint,
        30 - this.state.speed * 5,
        directions
      );
      document.addEventListener('keydown', this.registerKey);
      document.addEventListener('keyup', this.cancelKey);

      this.setState(state => ({
        isRunning: !state.isRunning,
        visibility: 'visible',
        topP1: topP1P2,
        leftP1: defaults.fpPadding,
        topP2: topP1P2,
        leftP2: leftP2 - defaults.fpPadding,
        topP3: defaults.fpPadding,
        leftP3: leftP3P4,
        topP4: topP4 - defaults.fpPadding,
        leftP4: leftP3P4
      }));
      this.initializeMode();
    } else if (!this.state.isPaused || reset) {
      window.clearInterval(handlePointInterval);
      document.removeEventListener('keydown', this.registerKey);
      document.removeEventListener('keyup', this.cancelKey);

      if (reset) {
        this.setState({
          isRunning: false,
          isPaused: false,
          visibility: 'hidden',
          dimensions: 10,
          speed: 1,
          shapesOthers: Array(4).fill(''),
          colorOthers: [
            defaults.P1.color,
            defaults.P2.color,
            defaults.P3.color,
            defaults.P4.color
          ],
          shapeP1: '',
          shapeP2: '',
          shapeP3: '',
          shapeP4: '',
          colorP1: defaults.P1.color,
          colorP2: defaults.P2.color,
          colorP3: defaults.P3.color,
          colorP4: defaults.P4.color
        });
      } else {
        this.setState(state => ({
          isPaused: !state.isPaused
        }));
      }
    } else {
      handlePointInterval = window.setInterval(
        this.handlePoint,
        30 - this.state.speed * 5,
        directions
      );
      document.addEventListener('keydown', this.registerKey);
      document.addEventListener('keyup', this.cancelKey);

      this.setState(state => ({
        isPaused: !state.isPaused
      }));
    }
  }

function initializeMode() {
    const mode = this.state.mode;

    switch (mode) {
      case 'fp':
        this.moveFloatingPoint();
        break;
      default:
        console.log('Choose mode!');
    }
  }

function registerKey(e) {
    e.preventDefault();

    const key = e.key;

    if (directions.hasOwnProperty(key)) directions[key].pressed = true;
  }

function cancelKey(e) {
    const key = e.key;

    if (directions.hasOwnProperty(key)) directions[key].pressed = false;
  }

function handleShape(shape, player) {
    if (
      this.state.shapeOthers.indexOf(shape) === -1 &&
      this.state['shape' + player] === ''
    ) {
      this.addShape(shape);
      this.setState({
        ['shape' + player]: shape
      });
    } else if (
      this.state.shapeOthers.indexOf(shape) === -1 &&
      this.state['shape' + player] !== ''
    ) {
      this.removeShape(this.state['shape' + player]);
      this.addShape(shape);
      this.setState({
        ['shape' + player]: shape
      });
    } else {
      this.removeShape(shape);
      this.setState({
        ['shape' + player]: ''
      });
    }
  }

function addShape(shape) {
    this.setState(state => ({
      shapeOthers: [...state.shapeOthers, shape]
    }));
  }

function removeShape(shape) {
    this.setState(state => ({
      shapeOthers: state.shapeOthers.filter(el => {
        return el !== shape;
      })
    }));
  }

function handleColor(color, player) {
    if (this.state.colorOthers.indexOf(color) === -1) {
      this.removeColor(this.state['color' + player]);
      this.addColor(color);
      this.setState({
        ['color' + player]: color
      });
    }
  }

function addColor(color) {
    this.setState(state => ({
      colorOthers: [...state.colorOthers, color]
    }));
  }

function removeColor(color) {
    this.setState(state => ({
      colorOthers: state.colorOthers.filter(el => {
        return el !== color;
      })
    }));
  }

function handleDimensions(dimensions) {
    this.setState({
      dimensions
    });
  }

function handleSpeed(speed) {
    this.setState({
      speed
    });
  }

    const data = {
      monitor: {
        players: {
          P1: {
            top: this.state.topP1,
            left: this.state.leftP1,
            shape: this.state.shapeP1,
            color: this.state.colorP1
          },
          P2: {
            top: this.state.topP2,
            left: this.state.leftP2,
            shape: this.state.shapeP2,
            color: this.state.colorP2
          },
          P3: {
            top: this.state.topP3,
            left: this.state.leftP3,
            shape: this.state.shapeP3,
            color: this.state.colorP3
          },
          P4: {
            top: this.state.topP4,
            left: this.state.leftP4,
            shape: this.state.shapeP4,
            color: this.state.colorP4
          },
          isPaused: this.state.isPaused,
          isRunning: this.state.isRunning,
          dimensions: this.state.dimensions,
          visibility: this.state.visibility,
          matchFloatingPoint: this.matchFloatingPoint
        },
        floatingPoint: {
          top: this.state.FP.top,
          left: this.state.FP.left,
          dimensions: this.state.dimensions,
          visibility: this.state.visibility
        },
        isRunning: this.state.isRunning
      },
      controlPanel: {
        common: {
          switch: {
            handleSwitch: this.handleSwitch,
            isTurnedOn: this.state.isTurnedOn
          },
          parameters: {
            dimensions: {
              handleDimensions: this.handleDimensions,
              dimensions: this.state.dimensions
            },
            speed: {
              handleSpeed: this.handleSpeed,
              speed: this.state.speed
            },
            isTurnedOn: this.state.isTurnedOn,
            isRunning: this.state.isRunning
          },
          buttons: {
            play: {
              handlePlay: this.handlePlay,
              isPaused: this.state.isPaused,
              isRunning: this.state.isRunning
            },
            reset: {
              handlePlay: this.handlePlay
            },
            isTurnedOn: this.state.isTurnedOn
          }
        },
        player: {
          P1: {
            shape: {
              handleShape: this.handleShape,
              shape: this.state.shapeP1,
              shapeOthers: this.state.shapeOthers,
              color: this.state.colorP1
            },
            color: {
              handleColor: this.handleColor,
              color: this.state.colorP1
            }
          },
          P2: {
            shape: {
              handleShape: this.handleShape,
              shape: this.state.shapeP2,
              shapeOthers: this.state.shapeOthers,
              color: this.state.colorP2
            },
            color: {
              handleColor: this.handleColor,
              color: this.state.colorP2
            }
          },
          P3: {
            shape: {
              handleShape: this.handleShape,
              shape: this.state.shapeP3,
              shapeOthers: this.state.shapeOthers,
              color: this.state.colorP3
            },
            color: {
              handleColor: this.handleColor,
              color: this.state.colorP3
            }
          },
          P4: {
            shape: {
              handleShape: this.handleShape,
              shape: this.state.shapeP4,
              shapeOthers: this.state.shapeOthers,
              color: this.state.colorP4
            },
            color: {
              handleColor: this.handleColor,
              color: this.state.colorP4
            }
          },
          shapeOthers: this.state.shapeOthers,
          isTurnedOn: this.state.isTurnedOn,
          isRunning: this.state.isRunning
        }
      }
    };

    return (
      <div className='controller'>
        <Monitor data={data.monitor} />
        <div className='divider-horizontal' />
        <ControlPanel data={data.controlPanel} />
      </div>
    );
  }

export default Controller;
