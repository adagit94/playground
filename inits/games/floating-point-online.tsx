import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from 'types/games/floating-point-online';

export const initGame: StatesGame = {
  state: 'conf', // conf / init / running / eval / reset
  admin: undefined,
  winner: undefined,
  timer: undefined,
  timerID: undefined,
  timestampStart: undefined,
  timestampEnd: undefined,
  width: undefined,
  height: undefined
};

export const initPlayers: StatesPlayers = {};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
