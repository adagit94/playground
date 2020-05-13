import React, { useReducer, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point-online';
import * as Inits from '../../../inits/games/floating-point-online';
import * as Contexts from '../../../contexts/games/floating-point-online';
import Defaults from '../../../defaults/games/floating-point-online';
import { ContextFirebase } from '../../../contexts/firebase';
import { ContextUser } from '../../../contexts/user';
import {
  HandleData,
  Operations,
  Directions,
  Limits,
  HandleMove
} from '../../../types/games/floating-point-online';

import {
  initGame,
  updateDataGame,
  updateDataPlayer,
  updateDataFP,
  updateDataUser
} from '../../../firebase/db';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
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
  const statesUser = useContext(ContextUser);
  const handleMoveRef = useRef(null);

  const { user } = statesFirebase;
  const { state, width, height } = statesGame;
  const { top: fPTop, left: fPLeft } = statesFP;
  const { dimensions } = Defaults;

  const playerLocal = user && user.uid;
  const dimensionsPercHeight = (dimensions / height) * 100;
  const dimensionsPercWidth = (dimensions / width) * 100;

  const handleMove: HandleMove = key => {
    let operation: Operations;
    let direction: Directions;
    let limit: Limits;

    switch (key) {
      case 'ArrowUp':
        operation = 'subtract';
        direction = 'top';
        limit = 'topLeft';
        break;

      case 'ArrowRight':
        operation = 'add';
        direction = 'left';
        limit = 'bottomRight';
        break;

      case 'ArrowDown':
        operation = 'add';
        direction = 'top';
        limit = 'bottomRight';
        break;

      case 'ArrowLeft':
        operation = 'subtract';
        direction = 'left';
        limit = 'topLeft';
        break;
    }

    const { top: playerLocalTop, left: playerLocalLeft } = statesPlayers[
      playerLocal
    ];

    switch (limit) {
      case 'topLeft':
        if (playerLocalTop <= 0 || playerLocalLeft <= 0) return;

        break;

      case 'bottomRight':
        if (
          playerLocalTop + dimensionsPercHeight >= 100 ||
          playerLocalLeft + dimensionsPercWidth >= 100
        ) {
          return;
        }

        break;
    }

    let dimension: number;
    let playerLocalPos: number;

    switch (direction) {
      case 'left':
        dimension = width;
        playerLocalPos = playerLocalLeft;
        break;

      case 'top':
        dimension = height;
        playerLocalPos = playerLocalTop;
        break;
    }

    let px = (dimension / 100) * playerLocalPos;

    switch (operation) {
      case 'add':
        px++;
        break;

      case 'subtract':
        px--;
        break;
    }

    const newPos = (px / dimension) * 100;

    updateDataPlayer('floatingPoint', playerLocal, {
      [direction]: newPos
    });
  };

  useEffect(() => {
    handleMoveRef.current = handleMove;
  });

  useEffect(() => {
    const initGame = (): void => {
      const players = Object.keys(statesPlayers);

      for (let i = 0; i < players.length; i++) {
        const player = players[i];

        if (playerLocal !== player) continue;

        let playerLocalTop: number;
        let playerLocalLeft: number;

        switch (i) {
          case 0:
            playerLocalTop = ((height / 2 - dimensions / 2) / height) * 100;
            playerLocalLeft = (10 / width) * 100;
            break;

          case 1:
            playerLocalTop = ((height / 2 - dimensions / 2) / height) * 100;
            playerLocalLeft = ((width - dimensions - 10) / width) * 100;
            break;

          case 2:
            playerLocalTop = (10 / height) * 100;
            playerLocalLeft = ((width / 2 - dimensions / 2) / width) * 100;
            break;

          case 3:
            playerLocalTop = ((height - dimensions - 10) / height) * 100;
            playerLocalLeft = ((width / 2 - dimensions / 2) / width) * 100;
            break;
        }

        updateDataPlayer('floatingPoint', player, {
          top: playerLocalTop,
          left: playerLocalLeft
        });

        if (i === players.length - 1) {
          const fpTop = ((height / 2 - dimensions / 2) / height) * 100;
          const fpLeft = ((width / 2 - dimensions / 2) / width) * 100;

          updateDataFP({ top: fpTop, left: fpLeft });
          updateDataGame('floatingPoint', { state: 'running' });
        }
      }
    };

    if (state === 'init') initGame();
  });

  useEffect(() => {
    const matchFloatingPoint = (): void => {
      const { top: playerLocalTop, left: playerLocalLeft } =
        playerLocal && statesPlayers[playerLocal];

      if (
        playerLocalTop + dimensionsPercHeight >= fPTop &&
        playerLocalTop <= fPTop + dimensionsPercHeight &&
        playerLocalLeft + dimensionsPercWidth >= fPLeft &&
        playerLocalLeft <= fPLeft + dimensionsPercWidth
      ) {
        const fpTop = Math.min(
          ((Math.random() * height) / height) * 100,
          ((height - dimensions) / height) * 100
        );

        const fpLeft = Math.min(
          ((Math.random() * width) / width) * 100,
          ((width - dimensions) / width) * 100
        );

        updateDataFP({ top: fpTop, left: fpLeft });

        updateDataUser(playerLocal, {
          games: {
            floatingPoint: {
              gatheredPoints: statesUser.games.floatingPoint.gatheredPoints + 1
            }
          }
        });

        updateDataPlayer('floatingPoint', playerLocal, {
          score: statesPlayers[playerLocal].score + 1
        });
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

    initGame('floatingPoint', user, handleData);
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
