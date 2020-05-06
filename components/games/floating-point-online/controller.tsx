import React, { useReducer, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point-online';
import * as Inits from '../../../inits/games/floating-point-online';
import * as Contexts from '../../../contexts/games/floating-point-online';
import Defaults from '../../../defaults/games/floating-point-online';
import { ContextFirebase } from '../../../contexts/firebase';
import {
  HandleData,
  Operations,
  Directions,
  Limits,
  HandleMove
} from '../../../types/games/floating-point-online';

import {
  initGame,
  createDataPlayer,
  updateDataGame,
  updateDataPlayer,
  updateDataFP,
  updateDataUser
} from '../../../firebase/db';

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
  const handleMoveRef = useRef(null);
  const recalculateRef = useRef(null);

  const { user } = statesFirebase;
  const { state, width, height } = statesGame;
  const { top: fPTop, left: fPLeft } = statesFP;

  const { dimensions } = Defaults;

  const handleMove: HandleMove = key => {
    let operation: Operations;
    let direction: Directions;
    let limit: Limits;

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
      if (playerLocal === player) continue;

      const { top: playerTop, left: playerLeft } = statesPlayers[player];

      if (
        playerLocalTop + dimensions >= playerTop &&
        playerLocalTop <= playerTop + dimensions &&
        playerLocalLeft + dimensions >= playerLeft &&
        playerLocalLeft <= playerLeft + dimensions
      ) {
        updateDataPlayer(playerLocal, 'move', {
          operation: operation === 'add' ? 'subtract' : 'add',
          direction
        });

        overlap = true;
      }
    }

    if (overlap === true) return;

    updateDataPlayer(playerLocal, 'move', {
      operation,
      direction
    });
  };

  const recalculate = (): void => {
    if (state !== 'running') return;

    const newHeight = document.querySelector('#monitor').clientHeight;
    const newWidth = document.querySelector('#monitor').clientWidth;

    for (const player in statesPlayers) {
      const playerTop =
        (statesPlayers[player].top / height) * 100 * (newHeight / 100);
      const playerLeft =
        (statesPlayers[player].left / width) * 100 * (newWidth / 100);

      updateDataPlayer(player, 'changePos', {
        top: playerTop,
        left: playerLeft
      });
    }

    const fpTop = (fPTop / height) * 100 * (newHeight / 100);
    const fpLeft = (fPLeft / width) * 100 * (newWidth / 100);

    updateDataFP({ top: fpTop, left: fpLeft });
  };

  useEffect(() => {
    handleMoveRef.current = handleMove;
    recalculateRef.current = recalculate;
  });

  useEffect(() => {
    const initGame = (): void => {
      const players = Object.keys(statesPlayers);

      if (players.length < 2) return;

      for (const player in statesPlayers) {
        if (!statesPlayers[player].isReady) return;
      }

      const playerLocal = user.uid;

      for (let i = 0; i < players.length; i++) {
        const player = players[i];

        if (playerLocal !== player) continue;

        let playerTop: number;
        let playerLeft: number;

        switch (i) {
          case 0:
            playerTop = height / 2 - dimensions / 2;
            playerLeft = 10;
            break;

          case 1:
            playerTop = height / 2 - dimensions / 2;
            playerLeft = width - dimensions - 10;
            break;

          case 2:
            playerTop = 10;
            playerLeft = width / 2 - dimensions / 2;
            break;

          case 3:
            playerTop = height - dimensions - 10;
            playerLeft = width / 2 - dimensions / 2;
            break;
        }

        updateDataPlayer(player, 'changePos', {
          top: playerTop,
          left: playerLeft
        });

        if (i === players.length - 1) {
          const fpTop = height / 2 - dimensions / 2;
          const fpLeft = width / 2 - dimensions / 2;

          updateDataFP({ top: fpTop, left: fpLeft });
          updateDataGame('floatingPoint', { state: 'running' });
        }
      }
    };

    if (state === 'conf') initGame();
  });

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      const playerLocal = user.uid;
      const { top: playerTop, left: playerLeft } = statesPlayers[playerLocal];

      if (
        playerTop + dimensions >= fPTop &&
        playerTop <= fPTop + dimensions &&
        playerLeft + dimensions >= fPLeft &&
        playerLeft <= fPLeft + dimensions
      ) {
        const fpTop = Math.min(Math.random() * height, height - dimensions);
        const fpLeft = Math.min(Math.random() * width, width - dimensions);

        updateDataUser(playerLocal, ['floatingPoint', 'addPoint']);
        updateDataPlayer(playerLocal, 'addScore');
        updateDataFP({ top: fpTop, left: fpLeft });
      }
    };

    if (state === 'running') matchFloatingPoint();
  });

  useEffect(() => {
    const registerKey = (e: KeyboardEvent): void => {
      e.preventDefault();

      handleMoveRef.current(e.key);
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
    const changeDimensions = (): void => {
      dispatchGame({
        type: 'changeDimensions',
        height: document.querySelector('#monitor').clientHeight,
        width: document.querySelector('#monitor').clientWidth
      });

      recalculateRef.current();
    };

    changeDimensions();
    window.addEventListener('resize', changeDimensions);

    return (): void => {
      window.removeEventListener('resize', changeDimensions);
    };
  }, []);

  useEffect(() => {
    const handleData: HandleData = (dataSet, data) => {
      switch (dataSet) {
        case 'game':
          dispatchGame({ type: 'setData', payload: data });
          break;

        case 'players':
          dispatchPlayers({ type: 'setData', payload: data });
          break;

        case 'fp':
          dispatchFP({ type: 'setData', payload: data });
          break;
      }
    };

    const initFP = async (): Promise<void> => {
      await initGame('floatingPoint', handleData);

      createDataPlayer(user);
    };

    initFP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(statesGame);
  //console.log(statesPlayers);
  //console.log(statesFP);
  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextFP.Provider value={statesFP}>
            <Monitor />
            <ControlPanel />
          </Contexts.ContextFP.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default React.memo(Controller);
