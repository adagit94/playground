import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../types/games/floating-point-offline';

import { Defaults } from '../../defaults/games/floating-point-offline';

export const initGame: StatesGame = {
  state: 'off', // off / conf / running / paused
  players: [true, true],
  profile: undefined,
  width: undefined,
  height: undefined
};

export const initPlayers: StatesPlayers = {
  P1: {
    top: undefined,
    left: undefined,
    score: undefined
  },
  P2: {
    top: undefined,
    left: undefined,
    score: undefined
  },
  P3: undefined,
  P4: undefined
};

export const initParams: StatesParams = {
  dimensions: undefined,
  speed: undefined,
  iconsOthers: [],
  colorsOthers: [Defaults.P1.color, Defaults.P2.color],
  P1: {
    icon: undefined,
    color: Defaults.P1.color
  },
  P2: {
    icon: undefined,
    color: Defaults.P2.color
  },
  P3: undefined,
  P4: undefined
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
