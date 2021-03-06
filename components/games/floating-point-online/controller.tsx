import styled from 'styled-components';
import {
  useReducer,
  useEffect,
  useContext,
  memo,
  useRef,
  useCallback
} from 'react';

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
  initGameDB,
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
  const gameStats = statesUser?.games.floatingPoint;
  const {
    state,
    admin,
    width,
    height,
    winner,
    timestampStart,
    timestampEnd
  } = statesGame;

  const playerLocal = user?.uid;

  const pointWidth = (size / width) * 100;
  const pointHeight = (size / height) * 100;

  let statesPlayersRef = useRef(statesPlayers);

  const initGame = useCallback(async (): Promise<void> => {
    const players = Object.keys(statesPlayersRef.current);
    const playerLocalIndex = players.indexOf(playerLocal);

    let playerLocalTop: number;
    let playerLocalLeft: number;

    switch (playerLocalIndex) {
      case 0:
        playerLocalTop = 50 - pointHeight;
        playerLocalLeft = pointWidth;
        break;

      case 1:
        playerLocalTop = 50 - pointHeight / 2;
        playerLocalLeft = 100 - pointWidth;
        break;

      case 2:
        playerLocalTop = pointHeight;
        playerLocalLeft = 50 - pointWidth / 2;
        break;

      case 3:
        playerLocalTop = 100 - pointHeight;
        playerLocalLeft = 50 - pointWidth / 2;
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
      const fpTop = 50 - pointHeight / 2;
      const fpLeft = 50 - pointWidth / 2;

      await updateDataFP({
        top: fpTop,
        left: fpLeft
      });

      crudDataGame('floatingPoint', 'update', {
        state: 'run',
        timestampStart: Date.now(),
        timer
      });
    }
  }, [pointWidth, pointHeight, timer, playerLocal]);

  const evalGame = useCallback(async (): Promise<void> => {
    const statesPlayers = statesPlayersRef.current;
    const players = Object.keys(statesPlayers);

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

    if (results.length === 1) {
      const { name: winnerName, score: winnerScore } = results[0];
      let winnerUserData: FloatingPoint;

      crudDataGame('floatingPoint', 'update', {
        winner: { name: winnerName, score: winnerScore }
      });

      if (firstPlayerID === playerLocal) {
        winnerUserData = gameStats;
      } else {
        winnerUserData = (await crudDataUserGame(
          firstPlayerID,
          'floatingPoint',
          'read'
        )) as GameData;
      }

      crudDataUserGame(firstPlayerID, 'floatingPoint', 'update', {
        wins: winnerUserData.wins + 1
      });
    } else {
      crudDataGame('floatingPoint', 'update', {
        winner: results
      });
    }

    updatePlayedTime('floatingPoint', players, [timestampStart, timestampEnd]);
  }, [playerLocal, gameStats, timestampStart, timestampEnd]);

  const resetGame = useCallback(() => {
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

    updateDataFP({
      top: null,
      left: null,
      autoMove: null
    });

    setTimeout(() => {
      crudDataGame('floatingPoint', 'update', {
        timer: null
      });
    }, 1000);
  }, []);

  const handleData: HandleData = useCallback((dataSet, data) => {
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
  }, []);

  useEffect(() => {
    statesPlayersRef.current = statesPlayers;
  });

  useEffect(() => {
    if (state === 'init') initGame();

    if (state === 'eval' && playerLocal === admin && winner === undefined) {
      evalGame();
    }

    if (state === 'reset' && playerLocal === admin) resetGame();

    if (user !== undefined && admin === undefined) {
      initGameDB('floatingPoint', user, handleData);
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
