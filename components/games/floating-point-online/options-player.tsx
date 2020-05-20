import { useContext, useEffect, useState, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import {
  WindowStats,
  WindowStatsGame
} from 'components/styled-components/windows';

import { updateDataGame, getDataUserGame, updateDataPlayer } from 'firebase/db';
import { statEditReg } from 'regs/stats';
import { statReplacer, convertPlayedTime } from 'helpers/stats';
import { Theming } from 'types/layout';
import { FloatingPoint } from 'types/user';
import { PropsOptionsPlayer } from 'types/games/floating-point-online';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import {
  ContextGame,
  ContextPlayers
} from 'contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  position: relative;

  &:hover {
    #stats {
      visibility: visible;
    }
  }
`;

const ContainerStats = styled.div`
  position: absolute;
  top: -85px;
  left: calc(50% - 100px);
  visibility: hidden;
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 75px;
`;

const ButtonStart = styled.button`
  padding: 5px;
  font-weight: bold;
  border: 1px solid ${(props): string => props.theme.inverted};
  border-radius: 5px;
  color: ${(props): string => props.theme.inverted};
  background-color: ${(props): string => props.theme.background};

  &:hover {
    cursor: pointer;
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
  }

  &:focus {
    outline: none;
  }
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
`;

const ContainerAvatar = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OptionsPlayer: React.FC<PropsOptionsPlayer> = ({
  player,
  initPossible,
  setInitPossible
}): JSX.Element => {
  const [gameStats, setGameStats] = useState(null);

  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { user } = statesFirebase;
  const { state, admin } = statesGame;
  const userGameStats = statesUser && statesUser.games.floatingPoint;
  const playerData = player && statesPlayers[player];

  const uid = user && user.uid;

  const ButtonReady = styled.button`
    padding: 5px;
    font-weight: bold;
    border: 1px solid
      ${(props): string =>
        playerData && !playerData.isReady && !initPossible
          ? '#f00'
          : props.theme.inverted};
    border-radius: 5px;
    color: ${(props): string =>
      playerData && playerData.isReady
        ? props.theme.background
        : props.theme.inverted};
    background-color: ${(props): string =>
      playerData && playerData.isReady
        ? props.theme.inverted
        : props.theme.background};

    &:focus {
      outline: none;
    }
  `;

  const ButtonReadyClickable = styled(ButtonReady)`
    transition-property: color, background-color;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    &:hover {
      cursor: pointer;
      color: ${(props): string => props.theme.background};
      background-color: ${(props): string => props.theme.inverted};
    }
  `;

  const Avatar = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 100%;
    background-image: url(${playerData && playerData.avatar});
    background-size: contain;
  `;

  const handleInit = (): void => {
    const players = Object.keys(statesPlayers);

    //if (players.length < 2) return;

    for (const player in statesPlayers) {
      if (!statesPlayers[player].isReady) {
        setInitPossible(false);

        return;
      }
    }

    setInitPossible(true);
    updateDataGame('floatingPoint', { state: 'init' });
  };

  useEffect(() => {
    const getStats = async (): Promise<void> => {
      let stats: FloatingPoint;
      const statsArr: any[] = [];

      if (uid === player) {
        stats = userGameStats;
      } else {
        stats = await getDataUserGame(player, 'floatingPoint');
      }

      for (const stat in stats) {
        const editedStat = stat.replace(statEditReg, statReplacer);

        if (stat === 'playedTime') {
          let playedTime: string | number = stats.playedTime;

          if (playedTime > 0) {
            playedTime = convertPlayedTime(playedTime);
          }

          statsArr.push([editedStat, playedTime]);
        } else {
          statsArr.push([editedStat, stats[stat]]);
        }
      }

      setGameStats(statsArr);
    };

    if (state === 'conf' && player) getStats();
  }, [state, uid, player, userGameStats]);

  //console.log(gameStats);

  return (
    <Container>
      {state === 'conf' && !playerData && (
        <LoadingIndicator color={theming.inverted} />
      )}

      {state === 'conf' && gameStats && (
        <ContainerStats id='stats'>
          <WindowStats>
            <WindowStatsGame>
              <ul>
                {gameStats.map(stat => {
                  const [name, value] = stat;

                  return (
                    <li key={name}>
                      <span>{name}</span>
                      <span>{value}</span>
                    </li>
                  );
                })}
              </ul>
            </WindowStatsGame>
          </WindowStats>
        </ContainerStats>
      )}

      {state === 'conf' && playerData && (
        <ContainerButtons>
          {uid === admin && admin === player && (
            <ButtonStart onClick={handleInit} type='button'>
              Start
            </ButtonStart>
          )}

          {uid === player && (
            <ButtonReadyClickable
              onClick={(): void => {
                updateDataPlayer('floatingPoint', player, {
                  isReady: playerData.isReady ? false : true
                });
              }}
              type='button'
            >
              Ready
            </ButtonReadyClickable>
          )}

          {uid !== player && <ButtonReady type='button'>Ready</ButtonReady>}
        </ContainerButtons>
      )}

      {playerData && (
        <ContainerInfo>
          <Info>{playerData.username}</Info>

          <Info>{state === 'run' && playerData.score}</Info>
        </ContainerInfo>
      )}

      {playerData && (
        <ContainerAvatar>
          <Avatar />
        </ContainerAvatar>
      )}
    </Container>
  );
};

export default memo(OptionsPlayer);
