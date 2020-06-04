import Router from 'next/router';
import { useContext, useEffect, useState, memo, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import {
  paddingButton,
  borderWidthButton,
  borderRadiusButton,
  heightContainerOptionsItem,
  widthStatsItem,
  heightStatsItem
} from 'components/styled-components/_variables';

import {
  WindowStats,
  WindowStatsGame
} from 'components/styled-components/windows';

import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { convertPlayedTime, updatePlayedTime } from 'helpers/stats';
import { Theming } from 'types/layout';
import { FloatingPoint, GameData } from 'types/user';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import {
  ContextGame,
  ContextPlayers
} from 'contexts/games/floating-point-online';

import {
  PropsOptionsPlayer,
  EnvNames
} from 'types/games/floating-point-online';

import {
  crudDataGamePlayer,
  crudDataUserGame,
  crudDataGame
} from 'firebase/db';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  position: relative;

  &:hover {
    #stats {
      visibility: visible;
    }
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: ${heightContainerOptionsItem};
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: ${heightContainerOptionsItem};
`;

const ButtonStart = styled.button`
  padding: ${paddingButton};
  font-weight: bold;
  border: ${borderWidthButton} solid ${(props): string => props.theme.inverted};
  border-radius: ${borderRadiusButton};
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const [gameStats, setGameStats] = useState<[string, string | number][]>([]);

  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { user } = statesFirebase;
  const { state, admin, envVotes, timestampStart } = statesGame;

  const uid = user?.uid;
  const userGameStats = statesUser?.games.floatingPoint;
  const playerData = statesPlayers?.[player];
  const players = Object.keys(statesPlayers);

  const stateRef = useRef(state);
  const timestampStartRef = useRef(timestampStart);
  const playersRef = useRef(players);

  const ContainerStats = styled.div`
    position: absolute;
    top: calc(-30px - ${gameStats.length} * ${heightStatsItem});
    left: calc(50% - ${widthStatsItem} / 2);
    visibility: hidden;
  `;

  const ButtonReady = styled.button`
    padding: ${paddingButton};
    font-weight: bold;
    border: ${borderWidthButton} solid
      ${(props): string =>
        playerData && !playerData.isReady && !initPossible
          ? '#f00'
          : props.theme.inverted};
    border-radius: ${borderRadiusButton};
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
    //if (players.length < 2) return;

    for (const player in statesPlayers) {
      if (!statesPlayers[player].isReady) {
        setInitPossible(false);

        return;
      }
    }

    let envs: [EnvNames, number][] = [];

    for (const env in envVotes) {
      envs.push([env as EnvNames, envVotes[env]]);
    }

    envs.sort((a, b) => a[1] - b[1]).reverse();

    const [name, votes] = envs[0];

    if (votes === 0) return;

    setInitPossible(true);
    crudDataGame('floatingPoint', 'update', { state: 'init', env: name });
  };

  useEffect(() => {
    stateRef.current = state;
    timestampStartRef.current = timestampStart;
    playersRef.current = players;
  });

  useEffect(() => {
    let handleExit;

    if (uid !== undefined && player !== undefined && uid === player) {
      handleExit = (url: string): void => {
        if (url.includes('floating-point-online')) return;

        if (playersRef.current.length === 1) {
          crudDataGame('floatingPoint', 'delete');

          return;
        }

        if (admin === player) {
          crudDataGame('floatingPoint', 'update', {
            admin: playersRef.current.find(player => player !== admin)
          });
        }

        if (stateRef.current === 'run') {
          updatePlayedTime('floatingPoint', playersRef.current, [
            timestampStartRef.current,
            Date.now()
          ]);

          crudDataGamePlayer('floatingPoint', player, 'delete');

          crudDataGame('floatingPoint', 'update', {
            state: 'reset'
          });
        } else {
          crudDataGamePlayer('floatingPoint', player, 'delete');
        }
      };

      Router.events.on('beforeHistoryChange', handleExit);
    }

    return (): void => {
      if (uid !== undefined && player !== undefined && uid === player) {
        Router.events.off('beforeHistoryChange', handleExit);
      }
    };
  }, [uid, admin, player]);

  useEffect(() => {
    if (state === 'conf' && player !== undefined && gameStats.length === 0) {
      const getStats = async (): Promise<void> => {
        let stats: FloatingPoint;
        let statsArr: [string, string | number][] = [];

        if (uid === player) {
          stats = userGameStats;
        } else {
          stats = (await crudDataUserGame(
            player,
            'floatingPoint',
            'read'
          )) as GameData;
        }

        for (const stat in stats) {
          const editedStat = stat.replace(keyEditReg, keyReplacer);

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

      getStats();
    }
  });
  //console.log(playerData);
  return (
    <Container>
      {state === 'conf' && playerData === undefined && (
        <LoadingIndicator color={theming.inverted} />
      )}

      {playerData !== undefined && (
        <>
          {state === 'conf' && (
            <>
              {gameStats.length !== 0 && (
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

              <ContainerButtons>
                {uid === admin && admin === player && (
                  <ButtonStart onClick={handleInit} type='button'>
                    Start
                  </ButtonStart>
                )}

                {uid === player && (
                  <ButtonReadyClickable
                    onClick={(): void => {
                      crudDataGamePlayer('floatingPoint', player, 'update', {
                        isReady: playerData.isReady ? false : true
                      });
                    }}
                    type='button'
                  >
                    Ready
                  </ButtonReadyClickable>
                )}

                {uid !== player && (
                  <ButtonReady type='button'>Ready</ButtonReady>
                )}
              </ContainerButtons>
            </>
          )}

          <ContainerInfo>
            <Info>{playerData.username}</Info>

            <Info>{state === 'run' && playerData.score}</Info>
          </ContainerInfo>

          <ContainerAvatar>
            <Avatar />
          </ContainerAvatar>
        </>
      )}
    </Container>
  );
};

export default memo(OptionsPlayer);
