import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../interfaces/games/floating-point';

import { Inits } from '../../types/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const init = <Inits extends unknown>(initStates: Inits): Inits =>
  initStates;

export const initGame: StatesGame = {
  players: [true, true],
  state: 'off', // off / conf / running / paused / recalc
  mode: 'fP',
  width: [undefined, undefined], // new / prev
  height: [undefined, undefined] // new / prev
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
  }
};

export const initParams: StatesParams = {
  dimensions: Defaults.dimensions,
  speed: Defaults.speed,
  shapesOthers: [],
  colorsOthers: [Defaults.P1.color, Defaults.P2.color],
  P1: {
    shape: undefined,
    color: Defaults.P1.color
  },
  P2: {
    shape: undefined,
    color: Defaults.P2.color
  }
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
