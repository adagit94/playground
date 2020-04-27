import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from '../../types/games/floating-point-online';

import { Defaults } from '../../defaults/games/floating-point-online';

export const initGame: StatesGame = {
  state: 'conf', // conf / running
  players: undefined,
  width: undefined,
  height: undefined
};

export const initPlayers: StatesPlayers = {
  P1: undefined,
  P2: undefined,
  P3: undefined,
  P4: undefined
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};