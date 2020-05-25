import {
  Defaults,
  InitGameDefaults,
  InitPlayerDefaults,
  InitEnvVotes,
  EnvList,
  EnvVotes,
  CreateGame,
  CreatePlayer
} from 'types/games/floating-point-online';

const initEnvVotes: InitEnvVotes = envs => {
  const envVotes = {} as EnvVotes;

  for (const env of envs) envVotes[env] = 0;

  return envVotes;
};

export const DEFAULTS: Defaults = {
  dimensions: 10,
  timer: 90,
  enviroments: {
    test: [
      {
        shape: 'Square',
        shapes: [
          {
            dimensions: [50, 50],
            positions: [90, 10]
          },
          {
            dimensions: [50, 50],
            positions: [90, 90]
          },
          {
            dimensions: [50, 50],
            positions: [10, 90]
          },
          {
            dimensions: [50, 50],
            positions: [10, 10]
          }
        ]
      },
      {
        shape: 'Circle',
        shapes: [
          {
            dimensions: [50, 50],
            positions: [10, 50]
          },
          {
            dimensions: [50, 50],
            positions: [50, 90]
          },
          {
            dimensions: [50, 50],
            positions: [90, 50]
          },
          {
            dimensions: [50, 50],
            positions: [50, 10]
          }
        ]
      }
    ]
  }
};

export const initGameDefaults: InitGameDefaults = admin => {
  const envNames = Object.keys(DEFAULTS.enviroments) as EnvList;
  const envVotes = initEnvVotes(envNames);

  const gameDefaults: CreateGame = {
    state: 'conf',
    timer: DEFAULTS.timer,
    admin,
    envVotes
  };

  return gameDefaults;
};

export const initPlayerDefaults: InitPlayerDefaults = user => {
  const playerDefaults: CreatePlayer = {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    isReady: false
  };

  return playerDefaults;
};
