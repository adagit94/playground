import { EnvObjectsList } from 'types/games/floating-point-online';

export const testI: EnvObjectsList = [
  {
    object: 'CircleTunnel',
    styles: {
      radius: 120,
      animationName: 'rotate360',
      animationDuration: '3s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      animationDelay: '3s',
      backgroundColor: 'transparent'
    },
    positions: [[50, 20]]
  },
  {
    object: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      transform: 'rotate(180deg)',
      animationName: 'translateCenterUp',
      animationDuration: '5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
    positions: [[50 - 15, 50 - 2.5]]
  },
  {
    object: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      transform: 'rotate(90deg)',
      animationName: 'translateCenterRight',
      animationDuration: '5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
    positions: [[50 - 15, 50 - 2.5]]
  },

  {
    object: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      animationName: 'translateCenterBottom',
      animationDuration: '5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
    positions: [[50 - 15, 50 - 2.5]]
  },
  {
    object: 'Triangle',
    styles: {
      width: 5,
      height: 30,
      transform: 'rotate(-90deg)',
      animationName: 'translateCenterLeft',
      animationDuration: '5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
    positions: [[50 - 15, 50 - 2.5]]
  }
  /*
  {
    object: 'Circle',
    styles: { width: 30, height: 30 },
    positions: [
      [10, 50],
      [50, 20],
      [70, 70]
    ]
  }*/
];

export const testII: EnvObjectsList = [
  {
    object: 'Rectangle',
    styles: { width: 1, height: 20 },
    positions: [
      [20, 49.5],
      [60, 49.5],
      [40, 55],
      [40, 44]
    ]
  },

  {
    object: 'Rectangle',
    styles: {
      width: 1,
      height: 20,
      animationName: 'translateToCenterVertical',
      animationDuration: '5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
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
    object: 'Rectangle',
    styles: {
      width: 1,
      height: 20,
      animationName: 'rotate360',
      animationDuration: '5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
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
