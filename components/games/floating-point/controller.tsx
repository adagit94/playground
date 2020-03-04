import React, { useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import { ContainerColumn } from '../../styled-components/containers';

import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
import * as Contexts from '../../../contexts/games/floating-point';
import {
  Key,
  ControlKeys,
  ControlKeys2P,
  ControlKeys3P,
  ControlKeys4P,
  Dispatches
} from '../../../types/games/floating-point';

let controlKeys: ControlKeys;
let intervalHandleMove: number;

const controlKeys2P: ControlKeys2P = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P1',
    limit: 'topLeft'
  },
  ArrowRight: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P1',
    limit: 'right'
  },
  ArrowDown: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P1',
    limit: 'bottom'
  },
  ArrowLeft: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P1',
    limit: 'topLeft'
  },
  w: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P2',
    limit: 'topLeft'
  },
  d: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P2',
    limit: 'right'
  },
  s: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P2',
    limit: 'bottom'
  },
  a: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P2',
    limit: 'topLeft'
  }
};

const controlKeys3P: ControlKeys3P = {
  ...controlKeys2P,
  i: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P3',
    limit: 'topLeft'
  },
  l: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P3',
    limit: 'right'
  },
  k: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P3',
    limit: 'bottom'
  },
  j: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P3',
    limit: 'topLeft'
  }
};

const controlKeys4P: ControlKeys4P = {
  ...controlKeys3P,
  '8': {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P4',
    limit: 'topLeft'
  },
  '6': {
    pressed: false,
    operation: 'add',
    direction: 'left',
    player: 'P4',
    limit: 'right'
  },
  '5': {
    pressed: false,
    operation: 'add',
    direction: 'top',
    player: 'P4',
    limit: 'bottom'
  },
  '4': {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    player: 'P4',
    limit: 'topLeft'
  }
};

const registerKey = (e: KeyboardEvent): void => {
  e.preventDefault();

  const key = e.key;

  if (key in controlKeys && controlKeys[key].pressed !== true) {
    controlKeys[key].pressed = true;
  }
};

const cancelKey = (e: KeyboardEvent): void => {
  const key = e.key;

  if (key in controlKeys) {
    controlKeys[key].pressed = false;
  }
};

const dispatches: Dispatches = {
  game: undefined,
  players: undefined,
  params: undefined,
  fp: undefined
};

const Container = styled(ContainerColumn)`
  height: 100%;
`;

const Controller: React.FC = (): JSX.Element => {
  const [statesGame, dispatchGame] = useReducer(
    Reducers.reducerGame,
    Inits.initGame,
    Inits.init
  );

  const [statesPlayers, dispatchPlayers] = useReducer(
    Reducers.reducerPlayers,
    Inits.initPlayers,
    Inits.init
  );

  const [statesParams, dispatchParams] = useReducer(
    Reducers.reducerParams,
    Inits.initParams,
    Inits.init
  );

  const [statesFP, dispatchFP] = useReducer(
    Reducers.reducerFP,
    Inits.initFP,
    Inits.init
  );

  const { players, state, width, height } = statesGame;
  const { dimensions, speed } = statesParams;
  const { top: fPTop, left: fPLeft } = statesFP;
  const [widthNew, widthPrev] = width;
  const [heightNew, heightPrev] = height;
  const playersCount = players.length;

  const refHandleMove = useRef(null);

  const handleMove = (): void => {
    for (const key in controlKeys) {
      const keyObj: Key = controlKeys[key];

      if (keyObj.pressed === true) {
        const { direction, player, limit } = keyObj;
        const playerPos: number = statesPlayers[player][direction];

        if (
          (limit === 'topLeft' && playerPos > 0) ||
          (limit === 'bottom' && playerPos + dimensions < heightNew) ||
          (limit === 'right' && playerPos + dimensions < widthNew)
        ) {
          const operation = keyObj.operation;

          dispatchPlayers({
            type: 'move',
            operation,
            direction,
            player
          });
        }
      }
    }
  };

  refHandleMove.current = handleMove;

  useEffect(() => {
    const currentHandleMove = (): void => {
      refHandleMove.current();
    };

    if (state === 'running' && intervalHandleMove === undefined) {
      switch (playersCount) {
        case 2:
          controlKeys = controlKeys2P;
          break;
        case 3:
          controlKeys = controlKeys3P;
          break;
        case 4:
          controlKeys = controlKeys4P;
          break;
      }

      intervalHandleMove = window.setInterval(
        currentHandleMove,
        30 - 5 * speed
      );

      window.addEventListener('keydown', registerKey);
      window.addEventListener('keyup', cancelKey);
    } else if (state !== 'running' && intervalHandleMove !== undefined) {
      window.clearInterval(intervalHandleMove);
      intervalHandleMove = undefined;

      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    }
  });

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      for (let i = 1; i <= playersCount; i++) {
        const player = `P${i}`;
        const { top: playerTop, left: playerLeft } = statesPlayers[player];

        if (
          (playerTop >= fPTop || playerTop + dimensions >= fPTop) &&
          playerTop <= fPTop + dimensions &&
          (playerLeft >= fPLeft || playerLeft + dimensions >= fPLeft) &&
          playerLeft <= fPLeft + dimensions
        ) {
          dispatchPlayers({
            type: 'addScore',
            player
          });

          dispatchFP({
            type: 'move',
            top: Math.min(Math.random() * heightNew, heightNew - dimensions),
            left: Math.min(Math.random() * widthNew, widthNew - dimensions)
          });
        }
      }
    };

    if (state === 'running') {
      matchFloatingPoint();
    }
  });

  useEffect(() => {
    const recalculatePos = (): void => {
      for (let i = 1; i <= playersCount; i++) {
        const player = `P${i}`;

        dispatchPlayers({
          type: 'recalculatePos',
          top:
            (statesPlayers[player].top / heightPrev) * 100 * (heightNew / 100),
          left:
            (statesPlayers[player].left / widthPrev) * 100 * (widthNew / 100),
          player
        });
      }

      dispatchFP({
        type: 'move',
        top: (fPTop / heightPrev) * 100 * (heightNew / 100),
        left: (fPLeft / widthPrev) * 100 * (widthNew / 100)
      });

      dispatchGame({ type: 'changeState', state: 'running' });
    };

    if (state === 'recalc') recalculatePos();
  });

  useEffect(() => {
    const calculateDimensions = (): void => {
      dispatchGame({
        type: 'calculateDimensions',
        width: document.querySelector('#monitor').clientWidth,
        height: document.querySelector('#monitor').clientHeight
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return (): void => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  useEffect(() => {
    dispatches.game = dispatchGame;
    dispatches.players = dispatchPlayers;
    dispatches.params = dispatchParams;
    dispatches.fp = dispatchFP;
  }, []);

  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextParams.Provider value={statesParams}>
            <Contexts.ContextFP.Provider value={statesFP}>
              <Monitor />
              <Contexts.ContextDispatches.Provider value={dispatches}>
                <ControlPanel />
              </Contexts.ContextDispatches.Provider>
            </Contexts.ContextFP.Provider>
          </Contexts.ContextParams.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default React.memo(Controller);

//console.log(statesGame.state); border: 1px solid red;
