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

import { initGame, initParams } from '../../inits/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const reducerGame: React.Reducer<StatesGame, ActionsGame> = (
  states,
  action
): StatesGame => {
  switch (action.type) {
    case 'changeState': // off / conf / running / paused
      return {
        ...states,
        state: action.state,
        players:
          action.state === 'off' || action.state === 'conf'
            ? initGame.players
            : states.players,
        profile:
          action.state === 'off' || action.state === 'conf'
            ? initGame.profile
            : states.profile
      };

    case 'changeDimensions':
      return {
        ...states,
        width: action.width,
        height: action.height
      };

    case 'changeProfile':
      return {
        ...states,
        profile: action.player
      };

    case 'changePlayers':
      switch (action.operation) {
        case 'add':
          return {
            ...states,
            players: [...states.players, action.pos]
          };

        case 'remove':
          return {
            ...states,
            players: states.players.filter(pos => pos !== action.pos)
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

export const reducerPlayers: React.Reducer<StatesPlayers, ActionsPlayers> = (
  states,
  action
): StatesPlayers => {
  switch (action.type) {
    case 'init':
      return {
        ...states,
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
            ...states,
            [action.player]: {
              ...states[action.player],
              [action.direction]: states[action.player][action.direction] + 1
            }
          };

        case 'subtract':
          return {
            ...states,
            [action.player]: {
              ...states[action.player],
              [action.direction]: states[action.player][action.direction] - 1
            }
          };

        case 'changePos':
          return {
            ...states,
            [action.player]: {
              ...states[action.player],
              top: action.top,
              left: action.left
            }
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

    case 'addScore':
      return {
        ...states,
        [action.player]: {
          ...states[action.player],
          score: states[action.player].score + 1
        }
      };

    case 'changePlayer':
      switch (action.operation) {
        case 'add':
          return {
            ...states,
            [action.player]: {
              top: undefined,
              left: undefined,
              score: undefined
            }
          };

        case 'remove':
          return {
            ...states,
            [action.player === 'P3' && states.P4 !== undefined
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
  states,
  action
): StatesParams => {
  switch (action.type) {
    case 'reset':
      return initParams;

    case 'handleIcon':
      console.log(action.operation);
      switch (action.operation) {
        case 'add':
          return {
            ...states,
            iconsOthers: [...states.iconsOthers, action.icon],
            [action.player]: {
              ...states[action.player],
              icon: action.icon
            }
          };

        case 'remove':
          return {
            ...states,
            iconsOthers: states.iconsOthers.filter(el => {
              return el !== states[action.player].icon;
            }),
            [action.player]: {
              ...states[action.player],
              icon: undefined
            }
          };

        case 'change':
          return {
            ...states,
            iconsOthers: [
              ...states.iconsOthers.filter(el => {
                return el !== states[action.player].icon;
              }),
              action.icon
            ],
            [action.player]: {
              ...states[action.player],
              icon: action.icon
            }
          };

        case 'nullify':
          return {
            ...states,
            [action.player]: {
              ...states[action.player],
              icon: null
            }
          };

        default:
          throw new Error('Unspecified / Wrong operation');
      }

    case 'changeColor':
      return {
        ...states,
        colorsOthers: [
          ...states.colorsOthers.filter(el => {
            return el !== states[action.player].color;
          }),
          action.color
        ],
        [action.player]: {
          ...states[action.player],
          color: action.color
        }
      };

    case 'changeDimensions':
      return {
        ...states,
        dimensions: action.dimensions
      };

    case 'changeSpeed':
      return {
        ...states,
        speed: action.speed
      };

    case 'changePlayer':
      switch (action.operation) {
        case 'add':
          if (action.player === 'P4' && Defaults.P4.color === states.P3.color) {
            return {
              ...states,
              colorsOthers: [...states.colorsOthers, Defaults.P3.color],
              [action.player]: {
                icon: undefined,
                color: Defaults.P3.color
              }
            };
          } else {
            return {
              ...states,
              colorsOthers: [
                ...states.colorsOthers,
                Defaults[action.player].color
              ],
              [action.player]: {
                shape: undefined,
                color: Defaults[action.player].color
              }
            };
          }

        case 'remove':
          if (action.player === 'P3' && states.P4 !== undefined) {
            return {
              ...states,
              iconsOthers: states.iconsOthers.filter(el => {
                return el !== states[action.player].icon;
              }),
              colorsOthers: states.colorsOthers.filter(el => {
                return el !== states[action.player].color;
              }),
              P3: states.P4,
              P4: undefined
            };
          } else {
            return {
              ...states,
              iconsOthers: states.iconsOthers.filter(el => {
                return el !== states[action.player].icon;
              }),
              colorsOthers: states.colorsOthers.filter(el => {
                return el !== states[action.player].color;
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
  states,
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
