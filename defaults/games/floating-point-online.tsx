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
  size: 30,
  timer: 90,
  enviroments: {
    mazeI: [
      {
        shape: 'Rectangle', // size: %
        shapes: [
          {
            size: [5, 5],
            positions: [30, 60]
          },
          {
            size: [5, 5],
            positions: [70, 20]
          },
          {
            size: [7, 7],
            positions: [50, 80]
          }
        ]
      },
      {
        shape: 'Circle', // size: px
        shapes: [
          {
            size: 30,
            positions: [10, 50]
          },
          {
            size: 50,
            positions: [50, 20]
          },
          {
            size: 70,
            positions: [70, 70]
          }
        ]
      }
    ],
    mazeII: [
      {
        shape: 'Rectangle',
        shapes: [
          {
            size: [25, 25],
            positions: [30, 60]
          },
          {
            size: [50, 50],
            positions: [70, 20]
          },
          {
            size: [75, 75],
            positions: [50, 80]
          }
        ]
      }
    ]
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
