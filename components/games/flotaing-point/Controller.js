import React from 'react';

import Monitor from './Monitor';
import ControlPanel from './ControlPanel';
import FPInterface from '../interfaces/FloatingPoint';

import './Controller.css';
import './Shared.css';

const players = 4;

const directions = {
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

const defaults = {
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

let handlePointInterval;

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTurnedOn: false,
      isRunning: false,
      isPaused: false,
      mode: 'fp',
      floatingPointPos: {},
      dimensions: undefined,
      speed: undefined,
      visibility: 'hidden',
      shapeOthers: [],
      colorOthers: [
        defaults.P1.color,
        defaults.P2.color,
        defaults.P3.color,
        defaults.P4.color
      ],
      topP1: 0,
      leftP1: 0,
      shapeP1: 'circle',
      colorP1: defaults.P1.color,
      scoreP1: 0,
      topP2: 0,
      leftP2: 0,
      shapeP2: 'square',
      colorP2: defaults.P2.color,
      scoreP2: 0,
      topP3: 0,
      leftP3: 0,
      shapeP3: 'rhombus',
      colorP3: defaults.P3.color,
      scoreP3: 0,
      topP4: 0,
      leftP4: 0,
      shapeP4: 'ellipse',
      colorP4: defaults.P4.color,
      scoreP4: 0
    };
    this.handlePoint = this.handlePoint.bind(this);
    this.initializeMode = this.initializeMode.bind(this);
    this.matchFloatingPoint = this.matchFloatingPoint.bind(this);
    this.moveFloatingPoint = this.moveFloatingPoint.bind(this);
    this.registerKey = this.registerKey.bind(this);
    this.cancelKey = this.cancelKey.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleShape = this.handleShape.bind(this);
    this.addShape = this.addShape.bind(this);
    this.removeShape = this.removeShape.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.addColor = this.addColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.handleDimensions = this.handleDimensions.bind(this);
    this.handleSpeed = this.handleSpeed.bind(this);
  }

  handlePoint(directions) {
    let pressedKeys = [];

    for (const direction in directions) {
      if (directions[direction].pressed === true) pressedKeys.push(direction);
    }

    if (pressedKeys.length > 0) {
      const pointContainerWidth = document.querySelector('.controller__monitor')
        .clientWidth;
      const pointContainerHeight = document.querySelector(
        '.controller__monitor'
      ).clientHeight;
      const dimensions = this.state.dimensions;
      const rightLimit = pointContainerWidth - dimensions;
      const bottomLimit = pointContainerHeight - dimensions;

      const l = pressedKeys.length;
      let i = 0;

      for (i; i < l; i++) {
        if (pressedKeys[i] === 'ArrowUp' && this.state.topP1 > 0) {
          this.setState(state => ({
            topP1: state.topP1 - 1
          }));
        } else if (
          pressedKeys[i] === 'ArrowRight' &&
          this.state.leftP1 < rightLimit
        ) {
          this.setState(state => ({
            leftP1: state.leftP1 + 1
          }));
        } else if (
          pressedKeys[i] === 'ArrowDown' &&
          this.state.topP1 < bottomLimit
        ) {
          this.setState(state => ({
            topP1: state.topP1 + 1
          }));
        } else if (pressedKeys[i] === 'ArrowLeft' && this.state.leftP1 > 0) {
          this.setState(state => ({
            leftP1: state.leftP1 - 1
          }));
        } else if (pressedKeys[i] === 'w' && this.state.topP2 > 0) {
          this.setState(state => ({
            topP2: state.topP2 - 1
          }));
        } else if (pressedKeys[i] === 'd' && this.state.leftP2 < rightLimit) {
          this.setState(state => ({
            leftP2: state.leftP2 + 1
          }));
        } else if (pressedKeys[i] === 's' && this.state.topP2 < bottomLimit) {
          this.setState(state => ({
            topP2: state.topP2 + 1
          }));
        } else if (pressedKeys[i] === 'a' && this.state.leftP2 > 0) {
          this.setState(state => ({
            leftP2: state.leftP2 - 1
          }));
        } else if (pressedKeys[i] === 'i' && this.state.topP3 > 0) {
          this.setState(state => ({
            topP3: state.topP3 - 1
          }));
        } else if (pressedKeys[i] === 'l' && this.state.leftP3 < rightLimit) {
          this.setState(state => ({
            leftP3: state.leftP3 + 1
          }));
        } else if (pressedKeys[i] === 'k' && this.state.topP3 < bottomLimit) {
          this.setState(state => ({
            topP3: state.topP3 + 1
          }));
        } else if (pressedKeys[i] === 'j' && this.state.leftP3 > 0) {
          this.setState(state => ({
            leftP3: state.leftP3 - 1
          }));
        } else if (pressedKeys[i] === '8' && this.state.topP4 > 0) {
          this.setState(state => ({
            topP4: state.topP4 - 1
          }));
        } else if (pressedKeys[i] === '6' && this.state.leftP4 < rightLimit) {
          this.setState(state => ({
            leftP4: state.leftP4 + 1
          }));
        } else if (pressedKeys[i] === '5' && this.state.topP4 < bottomLimit) {
          this.setState(state => ({
            topP4: state.topP4 + 1
          }));
        } else if (pressedKeys[i] === '4' && this.state.leftP4 > 0) {
          this.setState(state => ({
            leftP4: state.leftP4 - 1
          }));
        }
      }
    }
  }

  matchFloatingPoint() {
    const dimensions = this.state.dimensions;
    const fpPositions = this.state.floatingPointPos;

    for (let i = 1; i <= players; i++) {
      if (
        (this.state['topP' + i] >= fpPositions.top ||
          this.state['topP' + i] + dimensions >= fpPositions.top) &&
        this.state['topP' + i] <= fpPositions.top + 50 &&
        (this.state['leftP' + i] >= fpPositions.left ||
          this.state['leftP' + i] + dimensions >= fpPositions.left) &&
        this.state['leftP' + i] <= fpPositions.left + 50
      ) {
        this.setState(state => ({
          ['scoreP' + i]: state['scoreP' + i] + 1
        }));
        this.moveFloatingPoint();
      }
    }
  }

  moveFloatingPoint() {
    const pointContainerWidth = document.querySelector('.controller__monitor')
      .clientWidth;
    const pointContainerHeight = document.querySelector('.controller__monitor')
      .clientHeight;
    const top = Math.random() * pointContainerHeight;
    const left = Math.random() * pointContainerWidth;

    this.setState({
      floatingPointPos: {
        top,
        left
      }
    });
  }

  handleSwitch() {
    if (!this.state.isTurnedOn) {
      this.setState(state => ({
        isTurnedOn: !state.isTurnedOn,
        dimensions: defaults.dimensions,
        speed: defaults.speed
      }));
    } else {
      this.setState(state => ({
        isTurnedOn: !state.isTurnedOn,
        isRunning: false,
        isPaused: false,
        visibility: 'hidden',
        dimensions: undefined,
        speed: undefined,
        shapeOthers: [],
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
      }));
    }
  }

  handlePlay(reset = false) {
    if (!this.state.isRunning && !reset) {
      let playable = true;
      let i = 1;

      for (i; i <= players; i++) {
        if (this.state['shapeP' + i] === '') {
          playable = false;
          this.setState({
            ['shapeP' + i]: undefined
          });
        } else if (this.state['shapeP' + i] === undefined) {
          playable = false;
        }
      }

      if (playable === false) return;

      const pointContainerWidth = document.querySelector('.controller__monitor')
        .clientWidth;
      const pointContainerHeight = document.querySelector(
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
          shapeOthers: [],
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

  initializeMode() {
    const mode = this.state.mode;

    switch (mode) {
      case 'fp':
        this.moveFloatingPoint();
        break;
      default:
        console.log('Choose mode!');
    }
  }

  registerKey(e) {
    e.preventDefault();

    const key = e.key;

    if (directions.hasOwnProperty(key)) directions[key].pressed = true;
  }

  cancelKey(e) {
    const key = e.key;

    if (directions.hasOwnProperty(key)) directions[key].pressed = false;
  }

  handleShape(shape, player) {
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

  addShape(shape) {
    this.setState(state => ({
      shapeOthers: [...state.shapeOthers, shape]
    }));
  }

  removeShape(shape) {
    this.setState(state => ({
      shapeOthers: state.shapeOthers.filter(el => {
        return el !== shape;
      })
    }));
  }

  handleColor(color, player) {
    if (this.state.colorOthers.indexOf(color) === -1) {
      this.removeColor(this.state['color' + player]);
      this.addColor(color);
      this.setState({
        ['color' + player]: color
      });
    }
  }

  addColor(color) {
    this.setState(state => ({
      colorOthers: [...state.colorOthers, color]
    }));
  }

  removeColor(color) {
    this.setState(state => ({
      colorOthers: state.colorOthers.filter(el => {
        return el !== color;
      })
    }));
  }

  handleDimensions(dimensions) {
    this.setState({
      dimensions
    });
  }

  handleSpeed(speed) {
    this.setState({
      speed
    });
  }

  render() {
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
          top: this.state.floatingPointPos.top,
          left: this.state.floatingPointPos.left,
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
}

export default Controller;
