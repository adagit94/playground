import { mazeI, mazeII } from './floating-point-envs';

import {
  Defaults,
  InitGameDefaults,
  InitPlayerDefaults,
  InitEnvVotes,
  EnvList,
  EnvVotes,
  GameCreate,
  PlayerCreate
} from 'types/games/floating-point-online';

export const DEFAULTS: Defaults = {
  size: 15,
  timer: 1000,
  enviroments: {
    mazeI,
    mazeII
  }
};

export const initEnvVotes: InitEnvVotes = () => {
  const envVotes = {} as EnvVotes;
  const envNames = Object.keys(DEFAULTS.enviroments) as EnvList;

  for (const env of envNames) envVotes[env] = 0;

  return envVotes;
};

export const initGameDefaults: InitGameDefaults = admin => {
  const envVotes = initEnvVotes();

  const gameDefaults: GameCreate = {
    state: 'conf',
    timer: DEFAULTS.timer,
    admin,
    envVotes
  };

  return gameDefaults;
};

export const initPlayerDefaults: InitPlayerDefaults = user => {
  const playerDefaults: PlayerCreate = {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    isReady: false
  };

  return playerDefaults;
};
