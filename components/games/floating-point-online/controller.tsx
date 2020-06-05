import { useReducer, useEffect, useContext, memo, useRef } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from 'reducers/games/floating-point-online';
import * as Inits from 'inits/games/floating-point-online';
import * as Contexts from 'contexts/games/floating-point-online';
import { updatePlayedTime } from 'helpers/stats';
import { DEFAULTS, initEnvVotes } from 'defaults/games/floating-point-online';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import { FloatingPoint, GameData } from 'types/user';
import {
  HandleData,
  StatesGameDB,
  StatesPlayers,
  StatesFP,
  PlayerResultsData
} from 'types/games/floating-point-online';

import {
  crudDataGamePlayer,
  updateDataFP,
  crudDataUser,
  crudDataUserGame,
  crudDataGame,
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

  const { size, timer } = DEFAULTS;
  const { user } = statesFirebase;
  const { state, admin, width, height, winner } = statesGame;

  const playerLocal = user?.uid;
  const players = Object.keys(statesPlayers);

  const statesPlayersRef = useRef(statesPlayers);

  useEffect(() => {
    statesPlayersRef.current = statesPlayers;
  });

  useEffect(() => {
    if (state === 'init') {
      const initGame = async (): Promise<void> => {
        const playerLocalIndex = players.indexOf(playerLocal);

        let playerLocalTop: number;
        let playerLocalLeft: number;

        switch (playerLocalIndex) {
          case 0:
            playerLocalTop = ((height / 2 - size / 2) / height) * 100;
            playerLocalLeft = (10 / width) * 100;
            break;

          case 1:
            playerLocalTop = ((height / 2 - size / 2) / height) * 100;
            playerLocalLeft = ((width - size - 10) / width) * 100;
            break;

          case 2:
            playerLocalTop = (10 / height) * 100;
            playerLocalLeft = ((width / 2 - size / 2) / width) * 100;
            break;

          case 3:
            playerLocalTop = ((height - size - 10) / height) * 100;
            playerLocalLeft = ((width / 2 - size / 2) / width) * 100;
            break;
        }

        crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
          top: playerLocalTop,
          left: playerLocalLeft,
          score: 0
        });

        crudDataUser(playerLocal, 'update', {
          lastPlayed: 'Floating Point'
        });

        if (playerLocalIndex === players.length - 1) {
          const fpTop = ((height / 2 - size / 2) / height) * 100;
          const fpLeft = ((width / 2 - size / 2) / width) * 100;

          await updateDataFP({ top: fpTop, left: fpLeft });

          crudDataGame('floatingPoint', 'update', {
            state: 'run',
            timestampStart: Date.now(),
            timer
          });
        }
      };

      initGame();
    }

    if (state === 'eval' && playerLocal === admin && winner === undefined) {
      const evalGame = async (): Promise<void> => {
        let scores: [string, number][] = [];
        let results: PlayerResultsData = [];

        for (const player in statesPlayers) {
          scores.push([player, statesPlayers[player].score]);
        }

        scores.sort((a, b) => a[1] - b[1]).reverse();

        const [firstPlayerID, firstPlayerScore] = scores[0];

        for (const player of scores) {
          const [playerID, playerScore] = player;

          if (playerScore === firstPlayerScore) {
            const playerName = statesPlayers[playerID].username;

            results.push({ name: playerName, score: playerScore });
          }
        }

        console.log(results);
        if (results.length === 1) {
          const { name: winnerName, score: winnerScore } = results[0];
          console.log(results);
          console.log(winnerName);
          console.log(winnerScore);
          let winnerUserData: FloatingPoint;

          if (firstPlayerID === playerLocal) {
            winnerUserData = statesUser.games.floatingPoint;
          } else {
            winnerUserData = (await crudDataUserGame(
              firstPlayerID,
              'floatingPoint',
              'read'
            )) as GameData;
          }

          crudDataGame('floatingPoint', 'update', {
            winner: { name: winnerName, score: winnerScore }
          });

          crudDataUserGame(firstPlayerID, 'floatingPoint', 'update', {
            wins: winnerUserData.wins + 1
          });
        } else {
          crudDataGame('floatingPoint', 'update', {
            winner: results
          });
        }

        updatePlayedTime('floatingPoint', players, [
          statesGame.timestampStart,
          statesGame.timestampEnd
        ]);
      };

      evalGame();
    }

    if (state === 'reset' && playerLocal === admin) {
      const resetGame = (): void => {
        const resetedEnvVotes = initEnvVotes();

        crudDataGame('floatingPoint', 'update', {
          state: 'conf',
          winner: null,
          env: null,
          envVotes: resetedEnvVotes,
          timestampStart: null,
          timestampEnd: null
        });

        for (const player in statesPlayersRef.current) {
          crudDataGamePlayer('floatingPoint', player, 'update', {
            selectedEnv: null,
            top: null,
            left: null,
            score: null,
            isReady: false
          });
        }

        updateDataFP({ top: null, left: null });

        setTimeout(() => {
          crudDataGame('floatingPoint', 'update', {
            timer: null
          });
        }, 1000);
      };

      resetGame();
    }

    if (user !== undefined && admin === undefined) {
      const handleData: HandleData = (dataSet, data) => {
        switch (dataSet) {
          case 'game':
            dispatchGame({ type: 'setData', payload: data as StatesGameDB });
            break;

          case 'players':
            dispatchPlayers({
              type: 'setData',
              payload: data as StatesPlayers
            });

            break;

          case 'fp':
            dispatchFP({ type: 'setData', payload: data as StatesFP });
            break;
        }
      };

      initGame('floatingPoint', user, handleData);
    }

    /*
    return (): void => {
      console.log('game listeners removed');
      removeListenersGame('floatingPoint');
    };*/
  });

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

export default memo(Controller);
