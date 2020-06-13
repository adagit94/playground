import Router from 'next/router';
import {
  useContext,
  useEffect,
  useState,
  memo,
  useRef,
  useCallback
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import Avatar from 'components/styled-components/avatar';
import LoadingIndicator from 'components/styled-components/loading-indicator';
import {
  paddingButton,
  borderWidthButton,
  borderRadiusButton,
  heightContainerOptionsItem,
  widthStatsItem,
  heightStatsItem,
  borderColorHighlight
} from 'components/styled-components/_variables';

import {
  WindowStats,
  WindowStatsGame
} from 'components/styled-components/windows';

import { getAvatarPlaceholder } from 'defaults/games/floating-point-online';
import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { convertPlayedTime, updatePlayedTime } from 'helpers/stats';
import { Theming } from 'types/layout';
import { FloatingPoint, GameData } from 'types/user';
import { PropsOptionsPlayer, EnvName } from 'types/games/floating-point-online';
import { ContainerStatsProps, ButtonReadyProps } from 'types/styled-components';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import {
  ContextGame,
  ContextPlayers
} from 'contexts/games/floating-point-online';

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
  border: ${borderWidthButton} solid ${({ theme }): string => theme.inverted};
  border-radius: ${borderRadiusButton};
  color: ${({ theme }): string => theme.inverted};
  background-color: ${({ theme }): string => theme.background};

  &:hover {
    cursor: pointer;
    color: ${({ theme }): string => theme.background};
    background-color: ${({ theme }): string => theme.inverted};
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

const ContainerStats = styled.div<ContainerStatsProps>`
  position: absolute;
  top: calc(
    -30px - ${({ statsLength }): number => statsLength} * ${heightStatsItem}
  );
  left: calc(50% - ${widthStatsItem} / 2);
  visibility: hidden;
`;

const ButtonReady = styled.button<ButtonReadyProps>`
  padding: ${paddingButton};
  font-weight: bold;
  border: ${borderWidthButton} solid
    ${({ theme, isReady, highlightUnready }): string =>
      !isReady && highlightUnready ? borderColorHighlight : theme.inverted};
  border-radius: ${borderRadiusButton};
  color: ${({ theme, isReady }): string =>
    isReady ? theme.background : theme.inverted};
  background-color: ${({ theme, isReady }): string =>
    isReady ? theme.inverted : theme.background};

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
    color: ${({ theme }): string => theme.background};
    background-color: ${({ theme }): string => theme.inverted};
  }
`;

const OptionsPlayer: React.FC<PropsOptionsPlayer> = ({
  player,
  highlightUnready,
  dispatchControlPanel
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

  let stateRef = useRef(state);
  let timestampStartRef = useRef(timestampStart);
  let statesPlayersRef = useRef(statesPlayers);

  const handleInit = useCallback(() => {
    const statesPlayers = statesPlayersRef.current;

    //if (Object.keys(statesPlayers).length < 2) return;

    let initable: boolean;
    let votes: [EnvName, number][] = [];

    for (const player in statesPlayers) {
      if (!statesPlayers[player].isReady) {
        dispatchControlPanel({ type: 'setHighlightUnready', value: true });

        initable = false;

        break;
      }
    }

    for (const env in envVotes) {
      votes.push([env as EnvName, envVotes[env]]);
    }

    votes.sort((a, b) => a[1] - b[1]).reverse();

    const firstEnvVotes = votes[0][1];

    if (firstEnvVotes === 0) {
      dispatchControlPanel({ type: 'setHighlightEnvOptions', value: true });

      initable = false;
    }

    if (initable === false) return;

    let results: EnvName[] = [];

    for (const env of votes) {
      const [envName, envVotes] = env;

      if (envVotes === firstEnvVotes) results.push(envName);
    }

    if (results.length === 1) {
      crudDataGame('floatingPoint', 'update', {
        state: 'init',
        env: results[0]
      });
    } else {
      let choosedEnvIndex = Math.round(results.length / (Math.random() * 10));

      if (choosedEnvIndex === results.length) choosedEnvIndex -= 1;

      crudDataGame('floatingPoint', 'update', {
        state: 'init',
        env: results[choosedEnvIndex]
      });
    }

    dispatchControlPanel({ type: 'reset' });
  }, [envVotes, dispatchControlPanel]);

  const handleExit = useCallback(
    (url: string) => {
      if (url.includes('floating-point-online')) return;

      const players = Object.keys(statesPlayersRef.current);

      if (players.length === 1) {
        crudDataGame('floatingPoint', 'delete');

        return;
      }

      if (admin === player) {
        crudDataGame('floatingPoint', 'update', {
          admin: players.find(player => player !== admin)
        });
      }

      if (stateRef.current === 'run') {
        updatePlayedTime('floatingPoint', players, [
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
    },
    [admin, player]
  );

  useEffect(() => {
    stateRef.current = state;
    timestampStartRef.current = timestampStart;
    statesPlayersRef.current = statesPlayers;
  });

  useEffect(() => {
    if (uid !== undefined && player !== undefined && uid === player) {
      Router.events.on('beforeHistoryChange', handleExit);
    }

    return (): void => {
      console.log('router event removed');
      if (uid !== undefined && player !== undefined && uid === player) {
        Router.events.off('beforeHistoryChange', handleExit);
      }
    };
  }, [handleExit, uid, admin, player]);

  useEffect(() => {
    if (state === 'reset') setGameStats([]);
  }, [state]);

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
                <ContainerStats statsLength={gameStats.length} id='stats'>
                  <WindowStats>
                    <WindowStatsGame>
                      <ul>
                        {gameStats.map(stat => {
                          const [name, value] = stat;

                          return (
                            <li key={name}>
                              <span>{name}:</span>
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
                    isReady={playerData.isReady}
                    highlightUnready={highlightUnready}
                    type='button'
                  >
                    Ready
                  </ButtonReadyClickable>
                )}

                {uid !== player && (
                  <ButtonReady
                    isReady={playerData.isReady}
                    highlightUnready={highlightUnready}
                    type='button'
                  >
                    Ready
                  </ButtonReady>
                )}
              </ContainerButtons>
            </>
          )}

          <ContainerInfo>
            <Info>{playerData.username}</Info>

            <Info>{state === 'run' && playerData.score}</Info>
          </ContainerInfo>

          <ContainerAvatar>
            <Avatar
              width={75}
              height={75}
              avatar={
                playerData.avatar ||
                getAvatarPlaceholder(
                  theming.theme === 'light' ? 'dark' : 'light'
                )
              }
            />
          </ContainerAvatar>
        </>
      )}
    </Container>
  );
};

export default memo(OptionsPlayer);
