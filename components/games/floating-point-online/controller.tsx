import { useReducer, useEffect, useRef, useContext, memo } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from 'reducers/games/floating-point-online';
import * as Inits from 'inits/games/floating-point-online';
import * as Contexts from 'contexts/games/floating-point-online';
import { calculateMostPlayed } from 'helpers/stats';
import { DEFAULTS } from 'defaults/games/floating-point-online';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import {
  HandleData,
  Operations,
  Directions,
  Limits,
  HandleMove,
  Winner
} from 'types/games/floating-point-online';

import {
  updateDataGame,
  updateDataPlayer,
  updateDataFP,
  updateDataUser,
  getDataUserGame,
  initGame,
  removeListenersGame
} from 'firebase/db';

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

  const { dimensions, timer } = DEFAULTS;
  const { user } = statesFirebase;
  const { state, admin, width, height, winner } = statesGame;
  const { top: fPTop, left: fPLeft } = statesFP;

  const dimensionsPercHeight = (dimensions / height) * 100;
  const dimensionsPercWidth = (dimensions / width) * 100;
  const playerLocal = user && user.uid;

  const { top: playerLocalTop, left: playerLocalLeft } =
    playerLocal in statesPlayers && statesPlayers[playerLocal];

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

      default:
        return;
    }

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

      for (let i = 0, l = players.length; i < l; i++) {
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

        updateDataUser(playerLocal, {
          lastPlayed: 'floatingPoint'
        });

        if (i === l - 1) {
          const fpTop = ((height / 2 - dimensions / 2) / height) * 100;
          const fpLeft = ((width / 2 - dimensions / 2) / width) * 100;

          updateDataFP({ top: fpTop, left: fpLeft });
          updateDataGame('floatingPoint', {
            state: 'run',
            timestampStart: Date.now()
          });
        }
      }
    };

    if (state === 'init') initGame();
  });

  useEffect(() => {
    const matchFloatingPoint = (): void => {
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

    if (playerLocal in statesPlayers && state === 'run') matchFloatingPoint();
  });

  useEffect(() => {
    const evalGame = async (): Promise<void> => {
      const players = Object.keys(statesPlayers);
      const scores = players.map(player => statesPlayers[player].score);

      const sortedScores = [...scores].sort((a, b) => a - b).reverse(); // otestovat vatiantu s [player, score] -> a[1] - b[1], dale namisto - pouzit + pro opacne zarezni, reseni remizy
      const highestScore = sortedScores[0];
      const highestScoreIndex = scores.indexOf(highestScore);

      const winnerID = players[highestScoreIndex];
      const winnerName = statesPlayers[winnerID].username;
      const winnerResult: Winner = { name: winnerName, score: highestScore };

      updateDataGame('floatingPoint', {
        winner: winnerResult,
        timestampEnd: Date.now()
      });

      const winnerData = await getDataUserGame(winnerID, 'floatingPoint');

      updateDataUser(winnerID, {
        games: {
          floatingPoint: {
            wins: winnerData.wins
          }
        }
      });
    };

    const resetGame = (): void => {
      for (const player in statesPlayers) {
        updateDataPlayer('floatingPoint', player, {
          score: 0,
          isReady: false
        });
      }

      updateDataGame('floatingPoint', {
        state: 'conf',
        winner: null,
        timer
      });
    };

    if (state === 'eval' && playerLocal === admin && !winner) {
      evalGame();

      setTimeout(() => {
        resetGame();
      }, 10000);
    }
  });

  useEffect(() => {
    const registerKey = (e: KeyboardEvent): void => {
      e.preventDefault();

      handleMoveRef.current(e.key);
    };

    if (state === 'run') {
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

    if (user && !statesGame.admin && !(playerLocal in statesPlayers)) {
      initGame('floatingPoint', user, handleData);
    }
    /*
    return (): void => {
      removeListenersGame('floatingPoint');
    };
    */
  });

  console.log(statesGame);
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

export default memo(Controller);
