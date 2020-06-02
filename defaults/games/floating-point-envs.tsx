import { EnvObjects } from 'types/games/floating-point-online';

export const mazeI: EnvObjects = [
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

export const mazeII: EnvObjects = [
  /*{
    shape: ['Rectangle', { borderRadius: '0', transform: 'rotate(90deg)' }],
    shapes: [
      {
        size: 50,
        position: [48, 50]
      }
    ]
  },*/

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
      }
    ]
  },

  {
    shape: ['Rectangle', { transform: 'rotate(90deg)' }],
    shapes: [
      {
        size: [1, 20],
        position: [40, 55]
      },
      {
        size: [1, 20],
        position: [49.5, 25]
      }
    ]
  },

  {
    shape: 'Rectangle',
    shapes: [
      {
        size: [1, 95],
        position: [2.5, 5]
      },
      {
        size: [1, 95],
        position: [2.5, 11]
      },
      {
        size: [1, 95],
        position: [2.5, 17]
      },
      {
        size: [1, 95],
        position: [2.5, 23]
      },
      {
        size: [1, 95],
        position: [2.5, 29]
      },
      {
        size: [1, 95],
        position: [2.5, 35]
      },
      {
        size: [1, 95],
        position: [2.5, 64]
      },
      {
        size: [1, 95],
        position: [2.5, 70]
      },
      {
        size: [1, 95],
        position: [2.5, 76]
      },
      {
        size: [1, 95],
        position: [2.5, 82]
      },
      {
        size: [1, 95],
        position: [2.5, 88]
      },
      {
        size: [1, 95],
        position: [2.5, 94]
      }
    ]
  }
];
