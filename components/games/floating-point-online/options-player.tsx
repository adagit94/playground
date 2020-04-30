import React, { useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoadingIndicator from '../../styled-components/loading-indicator';

import { updateRecordPlayer } from '../../../firebase/db';
import { Colors } from '../../../types/layout';
import {
  PropsAvatar,
  PropsOptionsPlayer
} from '../../../types/games/floating-point-online';
import {
  ContextGame,
  ContextPlayers,
  ContextDispatchesFP
} from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 5px;
`;

const ContainerButtonReady = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75px;
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
`;

const Info = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Avatar: React.FC<PropsAvatar> = ({ avatar }): JSX.Element => {
  const ContainerAvatar = styled.div`
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  `;

  const Avatar = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 100%;
    background-image: url(${avatar});
    background-size: contain;
  `;

  return (
    <ContainerAvatar>
      <Avatar />
    </ContainerAvatar>
  );
};

const OptionsPlayer: React.FC<PropsOptionsPlayer> = ({ player }) => {
  const colors: Colors = useContext(ThemeContext);
  const dispatches = useContext(ContextDispatchesFP);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { state } = statesGame;

  let username, avatar, score, isReady;

  if (player) {
    const playerData = statesPlayers[player];

    username = playerData.username;
    avatar = playerData.avatar;
    score = playerData.score;
    isReady = playerData.isReady;
  }

  const ButtonReady = styled.button`
    padding: 5px;
    font-weight: bold;
    border: 1px solid ${(props): string => props.theme.inverted};
    border-radius: 5px;
    color: ${(props): string =>
      isReady ? props.theme.background : props.theme.inverted};
    background-color: ${(props): string =>
      isReady ? props.theme.inverted : props.theme.background};
    transition-property: color, background-color;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    &:hover {
      cursor: pointer;
      color: ${(props): string => props.theme.background};
      background-color: ${(props): string => props.theme.inverted};
    }

    &:focus {
      outline: none;
    }
  `;

  useEffect(() => {
    const initGame = (): void => {
      if (Object.keys(statesPlayers).length < 2) return;

      for (const player in statesPlayers) {
        if (!statesPlayers[player].isReady) return;
      }

      dispatches.game({ type: 'changeState', state: 'init' });
    };

    initGame();
  });

  return (
    <Container>
      <ContainerButtonReady>
        {state === 'conf' && (
          <ButtonReady
            onClick={(): void => {
              updateRecordPlayer(player, { isReady: !isReady });
            }}
            type='button'
          >
            isReady
          </ButtonReady>
        )}
      </ContainerButtonReady>
      <ContainerInfo>
        <Info>{player && username}</Info>
        <Info>{player && state === 'running' && score}</Info>
      </ContainerInfo>
      {player && <Avatar avatar={avatar} state={state} />}
      {!player && state === 'conf' && (
        <LoadingIndicator color={colors.inverted} />
      )}
    </Container>
  );
};

export default React.memo(OptionsPlayer);
