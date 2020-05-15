import { useContext, useEffect, useState, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoadingIndicator from '../../styled-components/loading-indicator';
import { WindowStats, WindowStatsItem } from '../../styled-components/windows';

import { statReg, statReplacer } from '../../../helpers/regs';
import { Theming } from '../../../types/layout';
import { PropsOptionsPlayer } from '../../../types/games/floating-point-online';
import { ContextFirebase } from '../../../contexts/firebase';
import {
  ContextGame,
  ContextPlayers
} from '../../../contexts/games/floating-point-online';

import {
  updateDataGame,
  getDataUserGame,
  updateDataPlayer
} from '../../../firebase/db';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  position: relative;
  margin: 5px;

  &:hover {
    #stats {
      visibility: visible;
    }
  }
`;

const ContainerStats = styled.div`
  position: absolute;
  top: -75px;
  left: calc(50% - 75px);
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
  height: 75px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { user } = statesFirebase;
  const { state, admin } = statesGame;
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

    if (players.length < 2) return;

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
      const statsArr = [];
      const stats = await getDataUserGame(player, 'floatingPoint');

      for (const stat in stats) {
        const editedProp = stat.replace(statReg, statReplacer);

        statsArr.push([editedProp, stats[stat]]);
      }

      setGameStats(statsArr);
    };

    if (player) getStats();
  }, [player]);

  console.log(gameStats);

  return (
    <Container>
      <ContainerStats id='stats'>
        {gameStats && (
          <WindowStats>
            <WindowStatsItem>
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
            </WindowStatsItem>
          </WindowStats>
        )}
      </ContainerStats>

      <ContainerButtons>
        {state === 'conf' && playerData && uid === admin && admin === player && (
          <ButtonStart onClick={handleInit} type='button'>
            Start
          </ButtonStart>
        )}

        {state === 'conf' && playerData && uid === player && (
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

        {state === 'conf' && playerData && uid !== player && (
          <ButtonReady type='button'>Ready</ButtonReady>
        )}
      </ContainerButtons>
      <ContainerInfo>
        <Info>{playerData && playerData.username}</Info>

        <Info>{state === 'running' && playerData && playerData.score}</Info>
      </ContainerInfo>
      <ContainerAvatar>
        {playerData && <Avatar />}

        {state === 'conf' && !playerData && (
          <LoadingIndicator color={theming.inverted} />
        )}
      </ContainerAvatar>
    </Container>
  );
};

export default memo(OptionsPlayer);
