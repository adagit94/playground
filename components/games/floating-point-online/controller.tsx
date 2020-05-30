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
import { FloatingPoint } from 'types/user';
import {
  HandleData,
  Winner,
  StatesGameDB,
  StatesPlayers,
  StatesFP
} from 'types/games/floating-point-online';

import {
  updateDataGame,
  updateDataPlayer,
  updateDataFP,
  updateDataUser,
  getDataUserGame,
  initGame,
  removeListenersGame,
  updateDataUserGame
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

  const { dimensions, timer } = DEFAULTS;
  const { user } = statesFirebase;
  const { state, admin, width, height, winner } = statesGame;

  const playerLocal = user?.uid;
  const players = Object.keys(statesPlayers);

  const statesPlayersRef = useRef(statesPlayers);

  useEffect(() => {
    statesPlayersRef.current = statesPlayers;
  });

  useEffect(() => {
    const initGame = (): void => {
      const playerLocalIndex = players.indexOf(playerLocal);

      let playerLocalTop: number;
      let playerLocalLeft: number;

      switch (playerLocalIndex) {
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

      updateDataPlayer('floatingPoint', playerLocal, {
        top: playerLocalTop,
        left: playerLocalLeft,
        score: 0
      });

      updateDataUser(playerLocal, {
        lastPlayed: 'Floating Point'
      });

      if (playerLocalIndex === players.length - 1) {
        const fpTop = ((height / 2 - dimensions / 2) / height) * 100;
        const fpLeft = ((width / 2 - dimensions / 2) / width) * 100;

        updateDataFP({ top: fpTop, left: fpLeft });

        updateDataGame('floatingPoint', {
          state: 'run',
          timestampStart: Date.now()
        });
      }
    };

    if (state === 'init') initGame();
  });

  useEffect(() => {
    const evalGame = async (): Promise<void> => {
      let scores: [string, number][] = [];

      for (const player in statesPlayers) {
        scores.push([player, statesPlayers[player].score]);
      }

      scores.sort((a, b) => a[1] - b[1]).reverse();

      let winnerData: FloatingPoint;
      const [winnerID, winnerScore] = scores[0];
      const winnerName = statesPlayers[winnerID].username;
      const winner: Winner = { name: winnerName, score: winnerScore };

      if (winnerID === playerLocal) {
        winnerData = statesUser.games.floatingPoint;
      } else {
        winnerData = await getDataUserGame(winnerID, 'floatingPoint');
      }

      updateDataGame('floatingPoint', {
        winner
      });

      updateDataUserGame('floatingPoint', winnerID, {
        wins: winnerData.wins + 1
      });

      updatePlayedTime('floatingPoint', players, [
        statesGame.timestampStart,
        statesGame.timestampEnd
      ]);

      setTimeout(() => {
        updateDataGame('floatingPoint', {
          state: 'reset'
        });
      }, 10000);
    };

    if (state === 'eval' && playerLocal === admin && winner === undefined) {
      evalGame();
    }
  });

  useEffect(() => {
    const resetGame = (): void => {
      const resetedEnvVotes = initEnvVotes();

      updateDataGame('floatingPoint', {
        state: 'conf',
        winner: null,
        env: null,
        envVotes: resetedEnvVotes,
        timestampStart: null,
        timestampEnd: null,
        timer
      });

      for (const player in statesPlayersRef.current) {
        updateDataPlayer('floatingPoint', player, {
          selectedEnv: null,
          top: null,
          left: null,
          score: null,
          isReady: false
        });
      }

      updateDataFP({ top: null, left: null });
    };

    if (state === 'reset' && playerLocal === admin) resetGame();
  });

  useEffect(() => {
    const handleData: HandleData = (dataSet, data) => {
      switch (dataSet) {
        case 'game':
          dispatchGame({ type: 'setData', payload: data as StatesGameDB });
          break;

        case 'players':
          dispatchPlayers({ type: 'setData', payload: data as StatesPlayers });
          break;

        case 'fp':
          dispatchFP({ type: 'setData', payload: data as StatesFP });
          break;
      }
    };

    if (user !== undefined && admin === undefined) {
      initGame('floatingPoint', user, handleData);
    }
    /*
    return (): void => {
      removeListenersGame('floatingPoint');
    };
    */
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
