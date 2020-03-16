import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../types/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const initGame: StatesGame = {
  players: [true, true, 'left', 'right'],
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
  dimensions: Defaults.dimensions,
  speed: Defaults.speed,
  shapesOthers: [],
  colorsOthers: [Defaults.P1.color, Defaults.P2.color],
  P1: {
    shape: 'square',
    color: Defaults.P1.color
  },
  P2: {
    shape: 'circle',
    color: Defaults.P2.color
  },
  P3: {
    shape: 'triangle',
    color: Defaults.P3.color
  },
  P4: {
    shape: 'cross',
    color: Defaults.P4.color
  }
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
