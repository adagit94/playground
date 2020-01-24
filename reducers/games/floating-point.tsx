import { Reducer } from '../../interfaces/games/floating-point';
import { initGame, init } from '../../inits/games/floating-point';
import Defaults from '../../defaults/games/floating-point';

export const reducerGame: Reducer = (state, action) => {
  switch (action.type) {
    case 'switchOn':
      return {
        ...state,
        isTurnedOn: !state.isTurnedOn,
        dimensions: Defaults.dimensions,
        speed: Defaults.speed
      };

    case 'switchOff':
      return init(initGame);

    case 'init':
      return {
        ...state,
        isRunning: !state.isRunning,
        visibility: 'visible'
      };
    case 'reset':
      return {
        ...state,
        isRunning: false,
        visibility: 'hidden',
        dimensions: Defaults.dimensions,
        speed: Defaults.speed
      };

    case 'changePause':
      return {
        ...state,
        isRunning: !state.isRunning
      };

    case 'changeDimensions':
      return {
        ...state,
        dimensions: action.dimensions
      };

    case 'changeSpeed':
      return {
        ...state,
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
        ...state,
        P1: {
          ...state.P1,
          top: action.topP1P2,
          left: 10
        },
        P2: {
          ...state.P2,
          top: action.topP1P2,
          left: action.leftP2 - 10
        },
        P3: {
          ...state.P3,
          top: 10,
          left: action.leftP3P4
        },
        P4: {
          ...state.P4,
          top: action.topP4 - 10,
          left: action.leftP3P4
        }
      };

    case 'reset':
      return {
        ...state,
        P1: {
          ...state.P1,
          shape: '',
          color: Defaults.P1.color
        },
        P2: {
          ...state.P2,
          shape: '',
          color: Defaults.P2.color
        },
        P3: {
          ...state.P3,
          shape: '',
          color: Defaults.P3.color
        },
        P4: {
          ...state.P4,
          shape: '',
          color: Defaults.P4.color
        },
        shapesOthers: [],
        colorsOthers: Defaults.colorsOthers
      };

    case 'move':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          [action.direction]:
            action.operation === 'add'
              ? state[action.player][action.direction] + 1
              : action.operation === 'subtract'
              ? state[action.player][action.direction] - 1
              : state[action.player][action.direction]
        }
      };

    case 'addScore':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          score: state[action.player].score + 1
        }
      };
    case 'changeShape':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          shape: action.operation === 'remove' ? '' : action.shape
        },
        shapesOthers:
          action.operation === 'add'
            ? [...state.shapesOthers, action.shape]
            : action.operation === 'remove'
            ? state.shapesOthers.filter(el => {
                return el !== state[action.player].shape;
              })
            : action.operation === 'change'
            ? [
                ...state.shapesOthers.filter(el => {
                  return el !== state[action.player].shape;
                }),
                action.shape
              ]
            : state.shapesOthers
      };

    case 'changeColor':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          color: action.color
        },
        colorsOthers: [
          ...state.colorsOthers.filter(el => {
            return el !== state[action.player].color;
          }),
          action.color
        ]
      };

    default:
      throw new Error('Unspecified action');
  }
};

export const reducerFP: Reducer = (state, action) => {
  switch (action.type) {
    case 'move':
      return {
        top: action.top,
        left: action.left
      };

    default:
      throw new Error('Unspecified action');
  }
};
