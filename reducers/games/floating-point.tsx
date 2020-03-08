import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  ActionsGame,
  ActionsPlayers,
  ActionsParams,
  ActionsFP
} from '../../types/games/floating-point';

import { initParams } from '../../inits/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const reducerGame: React.Reducer<StatesGame, ActionsGame> = (
  state,
  action
): StatesGame => {
  switch (action.type) {
    case 'changeState': // off / conf / running / paused
      return {
        ...state,
        players:
          action.state === 'off' || action.state === 'conf'
            ? [true, true]
            : state.players,
        state: action.state
      };

    case 'changeDimensions':
      return {
        ...state,
        width: action.width,
        height: action.height
      };

    case 'changePlayers':
      switch (action.operation) {
        case 'add':
          return {
            ...state,
            players: [...state.players, action.pos]
          };

        case 'remove':
          return {
            ...state,
            players: state.players.filter(pos => pos !== action.pos)
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

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

    case 'move':
      switch (action.operation) {
        case 'add':
          return {
            ...state,
            [action.player]: {
              ...state[action.player],
              [action.direction]: state[action.player][action.direction] + 1
            }
          };

        case 'subtract':
          return {
            ...state,
            [action.player]: {
              ...state[action.player],
              [action.direction]: state[action.player][action.direction] - 1
            }
          };

        case 'changePos':
          return {
            ...state,
            [action.player]: {
              ...state[action.player],
              top: action.top,
              left: action.left
            }
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

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
          return {
            ...state,
            [action.player === 'P3' && state.P4 !== undefined
              ? 'P4'
              : action.player]: undefined
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
      return initParams;

    case 'handleShape':
      switch (action.operation) {
        case 'add':
          return {
            ...state,
            shapesOthers: [...state.shapesOthers, action.shape],
            [action.player]: {
              ...state[action.player],
              shape: action.shape
            }
          };

        case 'remove':
          return {
            ...state,
            shapesOthers: state.shapesOthers.filter(el => {
              return el !== state[action.player].shape;
            }),
            [action.player]: {
              ...state[action.player],
              shape: undefined
            }
          };

        case 'change':
          return {
            ...state,
            shapesOthers: [
              ...state.shapesOthers.filter(el => {
                return el !== state[action.player].shape;
              }),
              action.shape
            ],
            [action.player]: {
              ...state[action.player],
              shape: action.shape
            }
          };

        case 'nullify':
          return {
            ...state,
            [action.player]: {
              ...state[action.player],
              shape: null
            }
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

    case 'changeColor':
      return {
        ...state,
        colorsOthers: [
          ...state.colorsOthers.filter(el => {
            return el !== state[action.player].color;
          }),
          action.color
        ],
        [action.player]: {
          ...state[action.player],
          color: action.color
        }
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
          if (action.player === 'P4' && Defaults.P4.color === state.P3.color) {
            return {
              ...state,
              colorsOthers: [...state.colorsOthers, Defaults.P3.color],
              [action.player]: {
                shape: undefined,
                color: Defaults.P3.color
              }
            };
          } else {
            return {
              ...state,
              colorsOthers: [
                ...state.colorsOthers,
                Defaults[action.player].color
              ],
              [action.player]: {
                shape: undefined,
                color: Defaults[action.player].color
              }
            };
          }

        case 'remove':
          if (action.player === 'P3' && state.P4 !== undefined) {
            return {
              ...state,
              shapesOthers: state.shapesOthers.filter(el => {
                return el !== state[action.player].shape;
              }),
              colorsOthers: state.colorsOthers.filter(el => {
                return el !== state[action.player].color;
              }),
              P3: state.P4,
              P4: undefined
            };
          } else {
            return {
              ...state,
              shapesOthers: state.shapesOthers.filter(el => {
                return el !== state[action.player].shape;
              }),
              colorsOthers: state.colorsOthers.filter(el => {
                return el !== state[action.player].color;
              }),
              [action.player]: undefined
            };
          }

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
