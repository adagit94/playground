import React, { useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
import * as Contexts from '../../../contexts/games/floating-point';
import {
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
    limit: 'top'
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
    limit: 'left'
  },
  w: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P2',
    limit: 'top'
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
    limit: 'left'
  }
};

const controlKeys3P: ControlKeys3P = {
  ...controlKeys2P,
  i: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P3',
    limit: 'top'
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
    limit: 'left'
  }
};

const controlKeys4P: ControlKeys4P = {
  ...controlKeys3P,
  '8': {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    player: 'P4',
    limit: 'top'
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
    limit: 'left'
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Controller: React.FC = (): JSX.Element => {
  const [statesGame, dispatchGame] = useReducer(
    Reducers.reducerGame,
    Inits.initGame
  );

  const [statesPlayers, dispatchPlayers] = useReducer(
    Reducers.reducerPlayers,
    Inits.initPlayers
  );

  const [statesParams, dispatchParams] = useReducer(
    Reducers.reducerParams,
    Inits.initParams
  );

  const [statesFP, dispatchFP] = useReducer(Reducers.reducerFP, Inits.initFP);

  const { players, state, width, height } = statesGame;
  const { dimensions, speed } = statesParams;
  const { top: fPTop, left: fPLeft } = statesFP;
  const playersCount = players.length;

  const refHandleMove = useRef(null);
  const refRecalculate = useRef(null);

  const handleMove = (): void => {
    for (const key in controlKeys) {
      if (controlKeys[key].pressed === false) continue;

      const { player, limit } = controlKeys[key];
      const playerLeft: number = statesPlayers[player].left;
      const playerTop: number = statesPlayers[player].top;

      switch (limit) {
        case 'top':
          if (playerTop === 0) continue;
          break;
        case 'right':
          if (playerLeft + dimensions === width) continue;
          break;
        case 'bottom':
          if (playerTop + dimensions === height) continue;
          break;
        case 'left':
          if (playerLeft === 0) continue;
          break;
      }

      const { operation, direction } = controlKeys[key];
      let overlap: boolean;

      for (let i = 1; i <= playersCount; i++) {
        if (player === `P${i}`) continue;

        const playerOther = `P${i}`;
        const playerOtherLeft: number = statesPlayers[playerOther].left;
        const playerOtherTop: number = statesPlayers[playerOther].top;

        if (
          playerTop + dimensions === playerOtherTop &&
          playerLeft + dimensions >= playerOtherLeft &&
          playerLeft <= playerOtherLeft + dimensions
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'top',
            player
          });

          overlap = true;

          break;
        } else if (
          playerTop === playerOtherTop + dimensions &&
          playerLeft + dimensions >= playerOtherLeft &&
          playerLeft <= playerOtherLeft + dimensions
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'top',
            player
          });

          overlap = true;

          break;
        } else if (
          playerLeft + dimensions === playerOtherLeft &&
          playerTop + dimensions >= playerOtherTop &&
          playerTop <= playerOtherTop + dimensions
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'left',
            player
          });

          overlap = true;

          break;
        } else if (
          playerLeft === playerOtherLeft + dimensions &&
          playerTop + dimensions >= playerOtherTop &&
          playerTop <= playerOtherTop + dimensions
        ) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'left',
            player
          });

          overlap = true;

          break;
        }
      }

      if (overlap === true) break;

      dispatchPlayers({
        type: 'move',
        operation,
        direction,
        player
      });
    }
  };

  const recalculate = (): void => {
    if (state !== 'running' && state !== 'paused') return;

    const newHeight = document.querySelector('#monitor').clientHeight;
    const newWidth = document.querySelector('#monitor').clientWidth;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;

      dispatchPlayers({
        type: 'move',
        operation: 'changePos',
        top: (statesPlayers[player].top / height) * 100 * (newHeight / 100),
        left: (statesPlayers[player].left / width) * 100 * (newWidth / 100),
        player
      });
    }

    dispatchFP({
      type: 'move',
      top: (fPTop / height) * 100 * (newHeight / 100),
      left: (fPLeft / width) * 100 * (newWidth / 100)
    });
  };

  useEffect(() => {
    refHandleMove.current = handleMove;
    refRecalculate.current = recalculate;
  });

  useEffect(() => {
    dispatches.game = dispatchGame;
    dispatches.players = dispatchPlayers;
    dispatches.params = dispatchParams;
    dispatches.fp = dispatchFP;
  }, []);

  useEffect(() => {
    const changeDimensions = (): void => {
      dispatchGame({
        type: 'changeDimensions',
        height: document.querySelector('#monitor').clientHeight,
        width: document.querySelector('#monitor').clientWidth
      });

      refRecalculate.current();
    };

    changeDimensions();
    window.addEventListener('resize', changeDimensions);

    return (): void => {
      window.removeEventListener('resize', changeDimensions);
    };
  }, []);

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      for (let i = 1; i <= playersCount; i++) {
        const player = `P${i}`;
        const { top: playerTop, left: playerLeft } = statesPlayers[player];

        if (
          (playerTop + dimensions >= fPTop || playerTop >= fPTop) &&
          playerTop <= fPTop + dimensions &&
          (playerLeft + dimensions >= fPLeft || playerLeft >= fPLeft) &&
          playerLeft <= fPLeft + dimensions
        ) {
          dispatchPlayers({
            type: 'addScore',
            player
          });

          dispatchFP({
            type: 'move',
            top: Math.min(Math.random() * height, height - dimensions),
            left: Math.min(Math.random() * width, width - dimensions)
          });
        }
      }
    };

    if (state === 'running') matchFloatingPoint();
  });

  useEffect(() => {
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
        refHandleMove.current,
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

    return (): void => {
      if (intervalHandleMove !== undefined) {
        window.clearInterval(intervalHandleMove);
        intervalHandleMove = undefined;

        window.removeEventListener('keydown', registerKey);
        window.removeEventListener('keyup', cancelKey);
      }
    };
  });

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

export default Controller;

//console.log(statesGame.state); border: 1px solid red;
