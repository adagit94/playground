import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from '../../types/games/floating-point-online';

export const initGame: StatesGame = {
  state: 'conf', // conf / init / running
  admin: undefined,
  width: undefined,
  height: undefined
};

export const initPlayers: StatesPlayers = {};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
