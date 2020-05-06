import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from '../../types/games/floating-point-online';

export const initGame: StatesGame = {
  state: 'conf', // conf / running
  width: null,
  height: null
};

export const initPlayers: StatesPlayers = {};

export const initFP: StatesFP = {
  top: null,
  left: null
};
