import {
  InitGame,
  InitPlayers,
  InitFp,
  Initializer
} from '../../interfaces/games/floating-point';

export const initGame: InitGame = {
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
    top: 0,
    left: 0,
    shape: 'circle',
    color: '#000000',
    score: 0
  },
  P2: {
    top: 0,
    left: 0,
    shape: 'square',
    color: '#808080',
    score: 0
  },
  P3: {
    top: 0,
    left: 0,
    shape: 'rhombus',
    color: '#708090',
    score: 0
  },
  P4: {
    top: 0,
    left: 0,
    shape: 'ellipse',
    color: '#2f4f4f',
    score: 0
  },
  shapesOthers: Array(4).fill(''),
  colorsOthers: ['#f00', '#008000', '#00f', '#ff0']
};

export const initFp: InitFp = {
  top: 0,
  left: 0
};

export const init: Initializer = initState => initState;
