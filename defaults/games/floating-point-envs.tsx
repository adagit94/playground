import { EnvObjects } from 'types/games/floating-point-online';

export const testI: EnvObjects = [
  {
    shape: 'Rectangle',
    styles: { width: 5, height: 5 },
    positions: [
      [30, 60],
      [70, 20],
      [50, 80]
    ]
  },
  {
    shape: 'Circle',
    styles: { width: 30, height: 30 },
    positions: [
      [10, 50],
      [50, 20],
      [70, 70]
    ]
  }
];

export const testII: EnvObjects = [
  {
    shape: 'Rectangle',
    styles: { width: 1, height: 20 },
    positions: [
      [25, 49.5],
      [55, 49.5],
      [40, 55],
      [40, 44]
    ]
  },

  {
    shape: 'Rectangle',
    styles: { width: 1, height: 15.83, animationName: 'translateVertical' },
    positions: [
      [0, 5],
      [84.17, 5],
      [0, 17],
      [84.17, 17],
      [0, 29],
      [84.17, 29],
      [0, 70],
      [84.17, 70],
      [0, 82],
      [84.17, 82],
      [0, 94],
      [84.17, 94]
    ]
  },
  {
    shape: 'Rectangle',
    styles: { width: 1, height: 31.66, animationName: 'rotate360' },
    positions: [
      [31.67, 11],
      [31.67, 23],
      [31.67, 35],
      [31.67, 76],
      [31.67, 64],
      [31.67, 88]
    ]
  }
];
