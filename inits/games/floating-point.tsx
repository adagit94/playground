import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../types/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const initGame: StatesGame = {
  players: [true, true],
  state: 'conf', // off / conf / running / paused
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
  dimensions: Defaults.dimensions,
  speed: Defaults.speed,
  shapesOthers: [],
  colorsOthers: [Defaults.P1.color, Defaults.P2.color],
  P1: {
    shape: 'circle',
    color: Defaults.P1.color
  },
  P2: {
    shape: 'triangle',
    color: Defaults.P2.color
  },
  P3: undefined,
  P4: undefined
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
