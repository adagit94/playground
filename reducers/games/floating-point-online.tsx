import { initControlPanel } from 'inits/games/floating-point-online';
import {
  StatesGame,
  StatesPlayers,
  StatesFP,
  StatesControlPanel,
  ActionsGame,
  ActionsPlayers,
  ActionsFP,
  ActionsControlPanel
} from 'types/games/floating-point-online';

export const reducerGame: React.Reducer<StatesGame, ActionsGame> = (
  states,
  action
): StatesGame => {
  switch (action.type) {
    case 'changeDimensions':
      return {
        ...states,
        width: action.width,
        height: action.height
      };

    case 'setData':
      return { ...states, ...action.payload };

    default:
      return states;
  }
};

export const reducerPlayers: React.Reducer<StatesPlayers, ActionsPlayers> = (
  states,
  action
): StatesPlayers => {
  switch (action.type) {
    case 'setData':
      return {
        ...action.payload
      };

    default:
      return states;
  }
};

export const reducerFP: React.Reducer<StatesFP, ActionsFP> = (
  states,
  action
): StatesFP => {
  switch (action.type) {
    case 'setData':
      return { ...action.payload };

    default:
      return states;
  }
};

export const reducerControlPanel: React.Reducer<
  StatesControlPanel,
  ActionsControlPanel
> = (states, action): StatesControlPanel => {
  switch (action.type) {
    case 'setHighlightUnready':
      return { ...states, highlightUnready: action.value };

    case 'setHighlightEnvOptions':
      return { ...states, highlightEnvOptions: action.value };

    case 'reset':
      return { ...initControlPanel };

    default:
      return states;
  }
};
