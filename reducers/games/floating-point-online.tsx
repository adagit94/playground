import {
  StatesGame,
  StatesPlayers,
  StatesFP,
  ActionsGame,
  ActionsPlayers,
  ActionsParams,
  ActionsFP
} from '../../types/games/floating-point-online';

import { initGame } from '../../inits/games/floating-point-online';

import { Defaults } from '../../defaults/games/floating-point-online';

export const reducerGame: React.Reducer<StatesGame, ActionsGame> = (
  states,
  action
): StatesGame => {
  switch (action.type) {
    case 'changeState': // conf / running
      return {
        ...states,
        state: action.state
      };

    case 'changeDimensions':
      return {
        ...states,
        width: action.width,
        height: action.height
      };

    case 'changePlayers':
      switch (action.operation) {
        case 'add':
          return {
            ...states,
            players: states.players + 1
          };

        case 'remove':
          return {
            ...states,
            players: states.players - 1
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
            [action.player]: undefined
          };

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