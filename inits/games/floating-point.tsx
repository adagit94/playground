const initGame: Interfaces.InitGame = {
  isTurnedOn: false,
  isRunning: false,
  isPaused: false,
  mode: 'fP',
  dimensions: undefined,
  speed: undefined,
  visibility: 'hidden'
};

const initPlayers: Interfaces.InitPlayers = {
  P1: {
    top: 0,
    left: 0,
    shape: 'circle',
    color: '#000000',
    score: 0
  },
  P2: {
    top: 0,
    left: 0,
    shape: 'square',
    color: '#808080',
    score: 0
  },
  P3: {
    top: 0,
    left: 0,
    shape: 'rhombus',
    color: '#708090',
    score: 0
  },
  P4: {
    top: 0,
    left: 0,
    shape: 'ellipse',
    color: '#2f4f4f',
    score: 0
  },
  shapesOthers: Array(4).fill(''),
  colorsOthers: [
    defaults.P1.color,
    defaults.P2.color,
    defaults.P3.color,
    defaults.P4.color
  ]
};

const initFp: Interfaces.InitFp = {
  top: 0,
  left: 0
};

const init: Interfaces.Initializer = initState => initState;