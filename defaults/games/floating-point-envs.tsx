import { EnvObjects } from 'types/games/floating-point-online';

export const testI: EnvObjects = [
  {
    shape: 'Rectangle', // size: %
    shapes: [
      {
        size: [5, 5],
        position: [30, 60]
      },
      {
        size: [5, 5],
        position: [70, 20]
      },
      {
        size: [7, 7],
        position: [50, 80]
      }
    ]
  },
  {
    shape: 'Circle', // size: px
    shapes: [
      {
        size: 30,
        position: [10, 50]
      },
      {
        size: 50,
        position: [50, 20]
      },
      {
        size: 70,
        position: [70, 70]
      }
    ]
  }
];

export const testII: EnvObjects = [
  {
    shape: 'Rectangle',
    shapes: [
      {
        size: [1, 20],
        position: [25, 49.5]
      },
      {
        size: [1, 20],
        position: [55, 49.5]
      },
      {
        size: [1, 20],
        position: [40, 55]
      },
      {
        size: [1, 20],
        position: [40, 44]
      }
    ]
  },

  {
    shape: ['Rectangle', { animationName: 'translateVertical' }],
    shapes: [
      {
        size: [1, 15.83],
        position: [0, 5]
      },
      {
        size: [1, 15.83],
        position: [84.17, 5]
      },

      {
        size: [1, 15.83],
        position: [0, 17]
      },
      {
        size: [1, 15.83],
        position: [84.17, 17]
      },

      {
        size: [1, 15.83],
        position: [0, 29]
      },
      {
        size: [1, 15.83],
        position: [84.17, 29]
      },

      {
        size: [1, 15.83],
        position: [0, 70]
      },
      {
        size: [1, 15.83],
        position: [84.17, 70]
      },

      {
        size: [1, 15.83],
        position: [0, 82]
      },
      {
        size: [1, 15.83],
        position: [84.17, 82]
      },

      {
        size: [1, 15.83],
        position: [0, 94]
      },
      {
        size: [1, 15.83],
        position: [84.17, 94]
      }
    ]
  },
  {
    shape: ['Rectangle', { animationName: 'rotate360' }],
    shapes: [
      {
        size: [1, 31.66],
        position: [31.67, 11]
      },

      {
        size: [1, 31.66],
        position: [31.67, 23]
      },

      {
        size: [1, 31.66],
        position: [31.67, 35]
      },

      {
        size: [1, 31.66],
        position: [31.67, 76]
      },

      {
        size: [1, 31.66],
        position: [31.67, 64]
      },

      {
        size: [1, 31.66],
        position: [31.67, 88]
      }
    ]
  }
];
