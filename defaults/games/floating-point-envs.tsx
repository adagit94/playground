import { EnvObjects } from 'types/games/floating-point-online';

export const testI: EnvObjects = [
  {
    shape: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      transform: 'rotate(180deg)',
      animationName: 'translateCenterUp'
    },
    positions: [[50 - 15, 50 - 2.5]]
  },
  {
    shape: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      transform: 'rotate(-90deg)',
      animationName: 'translateCenterRight'
    },
    positions: [[50 - 15, 50 - 2.5]]
  },
  {
    shape: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      animationName: 'translateCenterBottom'
    },
    positions: [[50 - 15, 50 - 2.5]]
  },
  {
    shape: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      transform: 'rotate(90deg)',
      animationName: 'translateCenterLeft'
    },
    positions: [[50 - 15, 50 - 2.5]]
  }
  /*
  {
    shape: 'Circle',
    styles: { width: 30, height: 30 },
    positions: [
      [10, 50],
      [50, 20],
      [70, 70]
    ]
  }*/
];

export const testII: EnvObjects = [
  {
    shape: 'Rectangle',
    styles: { width: 1, height: 20 },
    positions: [
      [20, 49.5],
      [60, 49.5],
      [40, 55],
      [40, 44]
    ]
  },

  {
    shape: 'Rectangle',
    styles: {
      width: 1,
      height: 20,
      animationName: 'translateToCenterVertical'
    },
    positions: [
      [0, 5],
      [80, 5],
      [0, 17],
      [80, 17],
      [0, 29],
      [80, 29],
      [0, 70],
      [80, 70],
      [0, 82],
      [80, 82],
      [0, 94],
      [80, 94]
    ]
  },
  {
    shape: 'Rectangle',
    styles: { width: 1, height: 20, animationName: 'rotate360' },
    positions: [
      [40, 11],
      [40, 23],
      [40, 35],
      [40, 76],
      [40, 64],
      [40, 88]
    ]
  }
];
