import {
  Initializer,
  InitGame,
  InitPlayers,
  InitFP,
  InitCK
} from '../../interfaces/games/floating-point';

import Defaults from '../../defaults/games/floating-point';

export const init: Initializer = initState => initState;

export const initGame: InitGame = {
  isTurnedOn: false,
  isRunning: false,
  mode: 'fP',
  dimensions: undefined,
  speed: undefined,
  visibility: 'hidden'
};

export const initPlayers: InitPlayers = {
  P1: {
    top: undefined,
    left: undefined,
    shape: 'square',
    color: Defaults.P1.color,
    score: 0
  },
  P2: {
    top: undefined,
    left: undefined,
    shape: 'circle',
    color: Defaults.P2.color,
    score: 0
  },
  P3: {
    top: undefined,
    left: undefined,
    shape: 'rhombus',
    color: Defaults.P3.color,
    score: 0
  },
  P4: {
    top: undefined,
    left: undefined,
    shape: 'ellipse',
    color: Defaults.P4.color,
    score: 0
  },
  shapesOthers: [],
  colorsOthers: Defaults.colorsOthers
};

export const initFP: InitFP = {
  top: undefined,
  left: undefined
};

export const initCK: InitCK = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P1'
  },
  ArrowRight: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P1'
  },
  ArrowDown: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P1'
  },
  ArrowLeft: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P1'
  },
  w: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P2'
  },
  d: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P2'
  },
  s: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P2'
  },
  a: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P2'
  },
  i: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P3'
  },
  l: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P3'
  },
  k: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P3'
  },
  j: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P3'
  },
  '8': {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P4'
  },
  '6': {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P4'
  },
  '5': {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P4'
  },
  '4': {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P4'
  }
};
