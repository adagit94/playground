import { Reducer } from '../../interfaces/games/floating-point';
import { initGame, initParams, init } from '../../inits/games/floating-point';

export const reducerGame: Reducer = (state, action) => {
  switch (action.type) {
    case 'switchOff':
      return init(initGame);

    case 'calculateDimensions':
      return {
        ...state,
        width: action.width,
        height: action.height
      };

    case 'changeState': // off / conf / init / running / paused
      return {
        ...state,
        state: action.state
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
          left: 10,
          score: 0
        },
        P2: {
          top: action.topP1P2,
          left: action.leftP2 - 10,
          score: 0
        },
        P3: {
          top: 10,
          left: action.leftP3P4,
          score: 0
        },
        P4: {
          top: action.topP4 - 10,
          left: action.leftP3P4,
          score: 0
        }
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

    default:
      throw new Error('Unspecified action');
  }
};

export const reducerParams: Reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return init(initParams);

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
