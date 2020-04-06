import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../types/games/floating-point';

import { Defaults } from '../../defaults/games/floating-point';

export const initGame: StatesGame = {
  state: 'conf', // off / conf / running / paused
  players: [true, true, 'left', 'right'],
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
  iconsOthers: ['ball1', 'ball2', 'ball3', 'ball4'],
  colorsOthers: [
    Defaults.P1.color,
    Defaults.P2.color,
    Defaults.P3.color,
    Defaults.P4.color
  ],
  P1: {
    icon: 'ball1',
    color: Defaults.P1.color
  },
  P2: {
    icon: 'ball2',
    color: Defaults.P2.color
  },
  P3: {
    icon: 'ball3',
    color: Defaults.P3.color
  },
  P4: {
    icon: 'ball4',
    color: Defaults.P4.color
  }
};

export const initFP: StatesFP = {
  top: undefined,
  left: undefined
};
