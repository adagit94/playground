import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from '../../types/games/floating-point-online';

import Defaults from '../../defaults/games/floating-point-online';

export const initGame: StatesGame = {
  state: 'conf', // conf / init / running
  width: undefined,
  height: undefined
};

export const initPlayers: StatesPlayers = {};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
