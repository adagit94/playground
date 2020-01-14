const reducerGame: Interfaces.Reducer = (state, action) => {
  switch (action.type) {
    case 'switchOn':
      return {
        isTurnedOn: !state.isTurnedOn,
        dimensions: 10,
        speed: 1
      };

    case 'switchOff':
      return init(initGame);

    case 'init':
      return {
        isRunning: !state.isRunning,
        visibility: 'visible'
      };
    case 'reset':
      return {
        isRunning: false,
        isPaused: false,
        visibility: 'hidden',
        dimensions: 10,
        speed: 1
      };

    case 'pause':
      return {
        isPaused: !state.isPaused
      };

    case 'changeDimensions':
      return {
        dimensions: action.dimensions
      };

    case 'changeSpeed':
      return {
        speed: action.speed
      };

    default:
      throw new Error('Unspecified action');
  }
};

const reducerPlayers: Interfaces.Reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        P1: {
          top: action.topP1P2,
          left: 10
        },
        P2: {
          top: action.topP1P2,
          left: action.leftP2 - 10
        },
        P3: {
          top: 10,
          left: action.leftP3P4
        },
        P4: {
          top: action.topP4 - 10,
          left: action.leftP3P4
        }
      };

    case 'reset':
      return {
        P1: {
          shape: '',
          color: defaults.P1.color
        },
        P2: {
          shape: '',
          color: defaults.P2.color
        },
        P3: {
          shape: '',
          color: defaults.P3.color
        },
        P4: {
          shape: '',
          color: defaults.P4.color
        },
        shapesOthers: Array(4).fill(''),
        colorsOthers: [
          defaults.P1.color,
          defaults.P2.color,
          defaults.P3.color,
          defaults.P4.color
        ]
      };

    case 'move':
      return {
        [action.player]: {
          positions: {
            [action.direction]:
              action.operation === 'add'
                ? state[action.player].positions[action.direction] + 1
                : state[action.player].positions[action.direction] - 1
          }
        }
      };

    case 'addScore':
      return {
        [action.player]: {
          score: state[action.player].score + 1
        }
      };
    case 'changeShape':
      return {
        [action.player]: {
          shape: action.operation === 'remove' ? '' : action.shape
        },
        shapesOthers:
          action.operation === 'add'
            ? [...state.shapesOthers, action.shape]
            : action.operation === 'remove'
            ? state.shapesOthers.filter(el => {
                return el !== state[action.player].shape;
              })
            : state.shapesOthers
                .filter(el => {
                  return el !== action.shape;
                })
                .push(action.shape)
      };

    case 'changeColor':
      return {
        [action.player]: {
          color: action.color
        },
        colorsOthers: state.colorsOthers
          .filter(el => {
            return el !== state[action.player].color;
          })
          .push(action.color)
      };

    default:
      throw new Error('Unspecified action');
  }
};

const reducerFp: Interfaces.Reducer = (state, action) => {
  switch (action.type) {
    case 'move':
      return {
        top: action.positions.top,
        left: action.positions.left
      };

    default:
      throw new Error('Unspecified action');
  }
};