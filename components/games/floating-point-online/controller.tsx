import React, { useReducer, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point-online';
import * as Inits from '../../../inits/games/floating-point-online';
import * as Contexts from '../../../contexts/games/floating-point-online';
import Defaults from '../../../defaults/games/floating-point-online';
import { ContextDispatchesLayout } from '../../../contexts/layout';
import { ContextFirebase } from '../../../contexts/firebase';
import { ContextUser } from '../../../contexts/user';
import {
  DispatchesFP,
  PathsList,
  DataList
} from '../../../types/games/floating-point-online';
import {
  initGame,
  getRecordPlayers,
  addListeners,
  updateRecordPlayer,
  updateRecordFP,
  updateRecordUser
} from '../../../firebase/db';

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
  const statesUser = useContext(ContextUser);
  const dispatches = useContext(ContextDispatchesLayout);
  const refHandleMove = useRef(null);
  const refRecalculate = useRef(null);

  const { uid } = statesFirebase.user;
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

    const playerLocal = uid;
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

        updateRecordPlayer(playerLocal, { top: playerLocalTop - 1 });

        if (playerTop + dimensions - 1 === playerTop) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'top',
            player
          });

          updateRecordPlayer(player, { top: playerTop + 1 });
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

        updateRecordPlayer(playerLocal, { top: playerLocalTop + 1 });

        if (playerTop + 1 === playerTop + dimensions) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'top',
            player
          });

          updateRecordPlayer(player, { top: playerTop - 1 });
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

        updateRecordPlayer(playerLocal, { left: playerLocalLeft - 1 });

        if (playerLeft + dimensions - 1 === playerLeft) {
          dispatchPlayers({
            type: 'move',
            operation: 'add',
            direction: 'left',
            player
          });

          updateRecordPlayer(player, { left: playerLeft + 1 });
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

        updateRecordPlayer(playerLocal, { left: playerLocalLeft + 1 });

        if (playerLeft + 1 === playerLeft + dimensions) {
          dispatchPlayers({
            type: 'move',
            operation: 'subtract',
            direction: 'left',
            player
          });

          updateRecordPlayer(player, { left: playerLeft - 1 });
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

    updateRecordPlayer(playerLocal, {
      [direction]:
        operation === 'add' ? playerLocalLeft + 1 : playerLocalLeft - 1
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

      dispatchPlayers({
        type: 'move',
        operation: 'changePos',
        top: playerTop,
        left: playerLeft,
        player
      });

      updateRecordPlayer(player, { top: playerTop, left: playerLeft });
    }

    const fpTop = (fPTop / height) * 100 * (newHeight / 100);
    const fpLeft = (fPLeft / width) * 100 * (newWidth / 100);

    dispatchFP({
      type: 'move',
      top: fpTop,
      left: fpLeft
    });

    updateRecordFP({ top: fpTop, left: fpLeft });
  };

  useEffect(() => {
    refHandleMove.current = handleMove;
    refRecalculate.current = recalculate;
  });

  useEffect(() => {
    const initGame = (): void => {
      const players = Object.keys(statesPlayers);

      for (let i = 0; i < players.length; i++) {
        const player = players[i];
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

        dispatchPlayers({
          type: 'move',
          operation: 'changePos',
          player,
          top: playerTop,
          left: playerLeft
        });

        updateRecordPlayer(player, { top: playerTop, left: playerLeft });
      }

      const fpTop = height / 2 - dimensions / 2;
      const fpLeft = width / 2 - dimensions / 2;

      dispatchFP({
        type: 'move',
        top: fpTop,
        left: fpLeft
      });

      updateRecordFP({ top: fpTop, left: fpLeft });
    };

    if (state === 'init') {
      initGame();

      dispatchGame({ type: 'changeState', state: 'running' });
    }
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
          const fpTop = Math.min(Math.random() * height, height - dimensions);
          const fpLeft = Math.min(Math.random() * width, width - dimensions);

          if (player === uid) {
            dispatches.user({
              type: 'editGame',
              game: 'floatingPoint',
              operation: 'addPoint'
            });
          }

          dispatchPlayers({
            type: 'addScore',
            player
          });

          dispatchFP({
            type: 'move',
            top: fpTop,
            left: fpLeft
          });

          if (player === uid) {
            updateRecordUser(
              uid,
              {
                gatheredPoints:
                  statesUser.games.floatingPoint.gatheredPoints + 1
              },
              'floatingPoint'
            );
          }

          updateRecordPlayer(uid, {
            score: statesPlayers[player].score + 1
          });

          updateRecordFP({ top: fpTop, left: fpLeft });
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
    const handleChange = (path: PathsList, data: DataList): void => {
      switch (path) {
        case 'game':
          dispatchGame({ type: 'setData', payload: data });
      }
    };

    const initGame = async (): Promise<void> => {
      await initGame();

      const players = await getRecordPlayers();

      dispatchPlayers({ type: 'init', payload: players });

      addListeners(handleChange);
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
