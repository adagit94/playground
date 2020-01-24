import {
  Initializer,
  InitGame,
  InitPlayers,
  InitFP
} from '../../interfaces/games/floating-point';

import Defaults from '../../defaults/games/floating-point';

export const init: Initializer = initState => initState;

export const initGame: InitGame = {
  players: 4,
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
