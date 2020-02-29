import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  Init
} from '../../types/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const init: Init = initStates => initStates;

export const initGame: StatesGame = {
  players: [true, true],
  state: 'off', // off / conf / running / paused / recalc
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
  },
  P3: undefined,
  P4: undefined
};

export const initParams: StatesParams = {
  dimensions: 30,
  speed: 5,
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
  P3: undefined,
  P4: undefined
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
