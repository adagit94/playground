import {
  Initializer,
  InitGame,
  InitPlayers,
  InitParams,
  InitFP
} from '../../interfaces/games/floating-point';

import Defaults from '../../defaults/games/floating-point';

export const init: Initializer = initState => initState;

export const initGame: InitGame = {
  players: 4,
  isTurnedOn: false,
  isRunning: false,
  isPaused: false,
  mode: 'fP',
  dimensions: undefined,
  speed: undefined,
  visibility: 'hidden'
};

export const initPlayers: InitPlayers = {
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

export const initParams: InitParams = {
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
  colorsOthers: Defaults.colorsOthers
};

export const initFP: InitFP = {
  top: undefined,
  left: undefined
};
