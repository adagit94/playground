import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../interfaces/games/floating-point';

import { Inits } from '../../types/games/floating-point';

import Defaults from '../../defaults/games/floating-point';

export const init = <Inits extends unknown>(initStates: Inits): Inits =>
  initStates;

export const initGame: StatesGame = {
  players: [true, true],
  state: 'off', // off / conf / running / paused
  mode: 'fP',
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
  P3: {
    top: undefined,
    left: undefined,
    score: undefined
  },
  P4: {
    top: undefined,
    left: undefined,
    score: undefined
  }
};

export const initParams: StatesParams = {
  P1: {
    shape: 'square',
    color: Defaults.P1.color
  },
  P2: {
    shape: 'circle',
    color: Defaults.P2.color
  },
  P3: {
    shape: 'rhombus',
    color: Defaults.P3.color
  },
  P4: {
    shape: 'ellipse',
    color: Defaults.P4.color
  },
  shapesOthers: [],
  colorsOthers: Defaults.colorsOthers,
  dimensions: undefined,
  speed: undefined
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
