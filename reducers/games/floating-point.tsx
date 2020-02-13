import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../interfaces/games/floating-point';

import {
  ActionsGame,
  ActionsPlayers,
  ActionsParams,
  ActionsFP
} from '../../types/games/floating-point';

import { initParams, init } from '../../inits/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const reducerGame: React.Reducer<StatesGame, ActionsGame> = (
  state,
  action
): StatesGame => {
  switch (action.type) {
    case 'changeState': // off / conf / init / running / paused / recalculate
      return {
        ...state,
        players:
          action.state === 'off' || action.state === 'conf'
            ? [true, true]
            : state.players,
        state: action.state
      };

    case 'calculateDimensions':
      return {
        ...state,
        state: state.state === 'running' ? 'recalc' : state.state,
        width: [action.width, state.width[0]],
        height: [action.height, state.height[0]]
      };

    case 'changePlayers':
      return {
        ...state,
        players:
          action.operation === 'add'
            ? [...state.players, action.pos]
            : action.operation === 'remove'
            ? state.players.filter(pos => pos !== action.pos)
            : state.players
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

export const reducerPlayers: React.Reducer<StatesPlayers, ActionsPlayers> = (
  state,
  action
): StatesPlayers => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        [action.player]: {
          top: action.top,
          left: action.left,
          score: 0
        }
      };

    case 'recalculatePos':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          top: action.top,
          left: action.left
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

    case 'changePlayer':
      switch (action.operation) {
        case 'add':
          return {
            ...state,
            [action.player]: {
              top: undefined,
              left: undefined,
              score: undefined
            }
          };

        case 'remove':
          if (action.player === 'P3' && 'P4' in state) {
            state.P3 = state.P4;
            delete state['P4'];
          } else {
            delete state[action.player];
          }

          return {
            ...state
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

export const reducerParams: React.Reducer<StatesParams, ActionsParams> = (
  state,
  action
): StatesParams => {
  switch (action.type) {
    case 'reset':
      return init(initParams);

    case 'changeShape':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          shape: action.operation === 'remove' ? undefined : action.shape
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

    case 'changePlayer':
      switch (action.operation) {
        case 'add':
          return {
            ...state,
            [action.player]: {
              shape: undefined,
              color: Defaults[action.player].color
            },
            colorsOthers: [...state.colorsOthers, Defaults[action.player].color]
          };

        case 'remove':
          state.shapesOthers = state.shapesOthers.filter(el => {
            return el !== state[action.player].shape;
          });

          state.colorsOthers = state.colorsOthers.filter(el => {
            return el !== state[action.player].color;
          });

          if (action.player === 'P3' && 'P4' in state) {
            state.P3 = state.P4;
            delete state['P4'];
          } else {
            delete state[action.player];
          }

          return {
            ...state
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

export const reducerFP: React.Reducer<StatesFP, ActionsFP> = (
  state,
  action
): StatesFP => {
  switch (action.type) {
    case 'move':
      return {
        top: action.top,
        left: action.left
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};
