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
            size: [25, 5],
            positions: [0, 75]
          },
          {
            size: [25, 5],
            positions: [95, 75]
          },
          {
            size: [25, 5],
            positions: [95, 0]
          },
          {
            size: [25, 5],
            positions: [0, 0]
          },

          {
            size: [1, 25],
            positions: [5, 75]
          },
          {
            size: [1, 25],
            positions: [70, 75]
          },
          {
            size: [1, 25],
            positions: [70, 24]
          },
          {
            size: [1, 25],
            positions: [5, 24]
          },

          {
            size: [1, 22.5],
            positions: [10, 95]
          },
          {
            size: [1.5, 7],
            positions: [17.75, 93.5]
          },
          {
            size: [5, 7],
            positions: [46.5, 91]
          },
          {
            size: [1, 22.5],
            positions: [67.5, 95]
          },

          {
            size: [1, 70],
            positions: [20, 90]
          },
          {
            size: [1, 80],
            positions: [10, 85]
          },
          {
            size: [1, 80],
            positions: [10, 80]
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
