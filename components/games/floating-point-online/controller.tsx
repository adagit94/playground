import React, { useReducer, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import Defaults from '../../../defaults/games/floating-point-online';
import * as Reducers from '../../../reducers/games/floating-point-online';
import * as Inits from '../../../inits/games/floating-point-online';
import * as Contexts from '../../../contexts/games/floating-point-online';
import { ContextDispatchesLayout } from '../../../contexts/layout';
import { ContextFirebase } from '../../../contexts/firebase';
import { DispatchesFP } from '../../../types/games/floating-point-online';
import { initGameFP, getPlayersFP, addListenersFP } from '../../../firebase/db';

const dispatchesFP: DispatchesFP = {
  game: undefined,
  players: undefined,
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
  const [statesFP, dispatchFP] = useReducer(Reducers.reducerFP, Inits.initFP);
  const statesFirebase = useContext(ContextFirebase);
  const dispatches = useContext(ContextDispatchesLayout);
  const refHandleMove = useRef(null);
  const refRecalculate = useRef(null);

  const { user } = statesFirebase;
  const { state, width, height } = statesGame;
  const { top: fPTop, left: fPLeft } = statesFP;

  const { dimensions } = Defaults;

  const handleMove = (key): void => {
    let operation: string;
    let direction: string;
    let limit: string;

    switch (key) {
      case 'ArrowUp':
        operation = 'subtract';
        direction = 'top';
        limit = 'top';
        break;

      case 'ArrowRight':
        operation = 'add';
        direction = 'left';
        limit = 'right';
        break;

      case 'ArrowDown':
        operation = 'add';
        direction = 'top';
        limit = 'bottom';
        break;

      case 'ArrowLeft':
        operation = 'subtract';
        direction = 'left';
        limit = 'left';
        break;
    }

    const playerLocal = user.uid;
    const playerLocalLeft = statesPlayers[playerLocal].left;
    const playerLocalTop = statesPlayers[playerLocal].top;

    switch (limit) {
      case 'top':
        if (playerLocalTop <= 0) return;
        break;

      case 'right':
        if (playerLocalLeft + dimensions >= width) return;
        break;

      case 'bottom':
        if (playerLocalTop + dimensions >= height) return;
        break;

      case 'left':
        if (playerLocalLeft <= 0) return;
        break;
    }

    let overlap: boolean;

    for (const player in statesPlayers) {
      if (playerLocal === player) return;

      const playerLeft = statesPlayers[player].left;
      const playerTop = statesPlayers[player].top;

      if (
        (playerLocalTop + dimensions === playerTop ||
          playerLocalTop + dimensions - 1 === playerTop) &&
        playerLocalLeft + dimensions >= playerLeft &&
        playerLocalLeft <= playerLeft + dimensions
      ) {
        dispatchPlayers({
          type: 'move',
          operation: 'subtract',
          direction: 'top',
          player: playerLocal
        });

        if (playerTop + dimensions - 1 === playerTop) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'top',
            player
          });
        }

        overlap = true;
      } else if (
        (playerLocalTop === playerTop + dimensions ||
          playerLocalTop + 1 === playerTop + dimensions) &&
        playerLocalLeft + dimensions >= playerLeft &&
        playerLocalLeft <= playerLeft + dimensions
      ) {
        dispatchPlayers({
          type: 'move',
          operation: 'add',
          direction: 'top',
          player: playerLocal
        });

        if (playerTop + 1 === playerTop + dimensions) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'top',
            player
          });
        }

        overlap = true;
      } else if (
        (playerLocalLeft + dimensions === playerLeft ||
          playerLocalLeft + dimensions - 1 === playerLeft) &&
        playerLocalTop + dimensions >= playerTop &&
        playerLocalTop <= playerTop + dimensions
      ) {
        dispatchPlayers({
          type: 'move',
          operation: 'subtract',
          direction: 'left',
          player: playerLocal
        });

        if (playerLeft + dimensions - 1 === playerLeft) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'left',
            player
          });
        }

        overlap = true;
      } else if (
        (playerLocalLeft === playerLeft + dimensions ||
          playerLocalLeft + 1 === playerLeft + dimensions) &&
        playerLocalTop + dimensions >= playerTop &&
        playerLocalTop <= playerTop + dimensions
      ) {
        dispatchPlayers({
          type: 'move',
          operation: 'add',
          direction: 'left',
          player: playerLocal
        });

        if (playerLeft + 1 === playerLeft + dimensions) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'left',
            player
          });
        }

        overlap = true;
      }
    }

    if (overlap === true) return;

    dispatchPlayers({
      type: 'move',
      operation,
      direction,
      player: playerLocal
    });
  };

  const recalculate = (): void => {
    if (state !== 'running') return;

    const newHeight = document.querySelector('#monitor').clientHeight;
    const newWidth = document.querySelector('#monitor').clientWidth;

    for (const player in statesPlayers) {
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
    const matchFloatingPoint = (): void => {
      for (const player in statesPlayers) {
        const { top: playerTop, left: playerLeft } = statesPlayers[player];

        if (
          playerTop + dimensions >= fPTop &&
          playerTop <= fPTop + dimensions &&
          playerLeft + dimensions >= fPLeft &&
          playerLeft <= fPLeft + dimensions
        ) {
          //dispatches.user({ type: 'addPoint' });

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
    const registerKey = (e: KeyboardEvent): void => {
      e.preventDefault();

      refHandleMove.current(e.key);
    };

    if (state === 'running') {
      window.addEventListener('keydown', registerKey);
    } else {
      window.removeEventListener('keydown', registerKey);
    }

    return (): void => {
      window.removeEventListener('keydown', registerKey);
    };
  }, [state]);

  useEffect(() => {
    dispatchesFP.game = dispatchGame;
    dispatchesFP.players = dispatchPlayers;
    dispatchesFP.fp = dispatchFP;
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
    const initGame = async (): Promise<void> => {
      await initGameFP();

      addListenersFP();

      const players = await getPlayersFP();

      dispatchPlayers({ type: 'init', payload: players });
    };

    initGame();
  }, []);

  //console.log(statesPlayers.P1.top + dimensions);
  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextFP.Provider value={statesFP}>
            <Monitor />
            <Contexts.ContextDispatchesFP.Provider value={dispatchesFP}>
              <ControlPanel />
            </Contexts.ContextDispatchesFP.Provider>
          </Contexts.ContextFP.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default React.memo(Controller);

/*
  const handlePlay: React.FormEventHandler<HTMLInputElement> = (): void => {
    const playersCount = statesGame.players.length;
    const { dimensions, speed } = statesParams;

    let playable: boolean;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;
      const icon = statesParams[player].icon;

      if (icon === undefined) {
        dispatches.params({
          type: 'handleIcon',
          operation: 'nullify',
          player
        });
      }

      if (playable !== false && (icon === undefined || icon === null)) {
        playable = false;
      }
    }

    if (dimensions === undefined) {
      dispatches.params({
        type: 'changeDimensions',
        dimensions: null
      });
    }

    if (speed === undefined) {
      dispatches.params({
        type: 'changeSpeed',
        speed: null
      });
    }

    if (
      playable !== false &&
      (dimensions === undefined ||
        dimensions === null ||
        speed === undefined ||
        speed === null)
    ) {
      playable = false;
    }

    if (playable === false) return;

    const height = statesGame.height;
    const width = statesGame.width;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;
      let top: number;
      let left: number;

      switch (player) {
        case 'P1':
          top = height / 2 - dimensions / 2;
          left = 10;
          break;
        case 'P2':
          top = height / 2 - dimensions / 2;
          left = width - dimensions - 10;
          break;
        case 'P3':
          top = 10;
          left = width / 2 - dimensions / 2;
          break;
        case 'P4':
          top = height - dimensions - 10;
          left = width / 2 - dimensions / 2;
          break;
      }

      dispatches.players({
        type: 'init',
        player,
        top,
        left
      });
    }

    dispatches.fp({
      type: 'move',
      top: height / 2 - dimensions / 2,
      left: width / 2 - dimensions / 2
    });

    dispatches.game({
      type: 'changeState',
      state: 'running'
    });
  };
*/
