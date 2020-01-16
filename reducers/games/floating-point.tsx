import { Reducer } from '../../interfaces/games/floating-point';
import { initGame, init } from '../../inits/games/floating-point';

export const reducerGame: Reducer = (state, action) => {
  switch (action.type) {
    case 'switchOn':
      return {
        isTurnedOn: !state.isTurnedOn,
        dimensions: 10,
        speed: 1
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

export const reducerPlayers: Reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        P1: {
          top: action.topP1P2,
          left: 10
        },
        P2: {
          top: action.topP1P2,
          left: action.leftP2 - 10
        },
        P3: {
          top: 10,
          left: action.leftP3P4
        },
        P4: {
          top: action.topP4 - 10,
          left: action.leftP3P4
        }
      };

    case 'reset':
      return {
        P1: {
          shape: '',
          color: '#f00'
        },
        P2: {
          shape: '',
          color: '#008000'
        },
        P3: {
          shape: '',
          color: '#00f'
        },
        P4: {
          shape: '',
          color: '#ff0'
        },
        shapesOthers: Array(4).fill(''),
        colorsOthers: ['#f00', '#008000', '#00f', '#ff0']
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

export const reducerFp: Reducer = (state, action) => {
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
