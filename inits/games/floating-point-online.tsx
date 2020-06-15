import {
  StatesGame,
  StatesPlayers,
  StatesFP,
  StatesControlPanel
} from 'types/games/floating-point-online';

export const initGame: StatesGame = {
  state: 'conf', // conf / init / running / eval / reset
  admin: undefined,
  env: undefined,
  envVotes: undefined,
  winner: undefined,
  timer: undefined,
  timestampStart: undefined,
  timestampEnd: undefined,
  width: undefined,
  height: undefined
};

export const initPlayers: StatesPlayers = {};

export const initFP: StatesFP = {
  top: [undefined, undefined],
  left: [undefined, undefined],
  autoMove: false
};

export const initControlPanel: StatesControlPanel = {
  highlightUnready: false,
  highlightEnvOptions: false
};
