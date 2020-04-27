import React, { useContext } from 'react';
import styled from 'styled-components';

import Icons from './icons';
import Color from './color';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import { ContainerOptions } from '../../styled-components/containers';

import { ContextUser } from '../../../contexts/user';
import { ContextFirebase } from '../../../contexts/firebase';
import {
  ContextGame,
  ContextPlayers
} from '../../../contexts/games/floating-point-online';

import {
  PropsAvatar,
  PropsOptionsPlayer,
  PropsOptions
} from '../../../types/games/floating-point-online';
import { ContextDispatchesFP } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 5px;
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
`;

const Info = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonLoadProfile = styled.button`
  padding: 5px;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: 5px;
  color: ${(props): string => props.theme.inverted};
  background-color: ${(props): string => props.theme.background};
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
    border-right-color: ${(props): string => props.theme.background};
    border-left-color: ${(props): string => props.theme.background};
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
  }

  &:focus {
    outline: none;
  }
`;

const Divider = styled(DividerVertical)`
  background-color: ${(props): string => props.theme.inverted};
`;

const Overlap = styled(OverlapDisabled)`
  background-color: ${(props): string =>
    props.theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;

const Avatar: React.FC<PropsAvatar> = ({ bg, state }): JSX.Element => {
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
    background-image: url(${bg});
    background-size: contain;
  `;

  return (
    <ContainerAvatar>
      <Avatar />
      {state !== 'conf' && <Overlap />}
    </ContainerAvatar>
  );
};

const Options: React.FC<PropsOptions> = ({ state, player }): JSX.Element => {
  return (
    <ContainerOptions>
      <Icons player={player} />
      <Divider />
      <Color player={player} />
      {state !== 'conf' && <Overlap />}
    </ContainerOptions>
  );
};

const OptionsPlayer: React.FC<PropsOptionsPlayer> = ({ player }) => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesUser = useContext(ContextUser);
  const statesFirebase = useContext(ContextFirebase);
  const dispatches = useContext(ContextDispatchesFP);

  const { state, profile } = statesGame;
  const score = statesPlayers[player].score;
  const user = statesFirebase.user;

  const withProfile = profile === player;

  return (
    <Container>
      <ContainerInfo>
        <Info>{player}</Info>
        <Info>
          {withProfile && user.displayName}

          {user && !profile && state === 'conf' && (
            <ButtonLoadProfile
              onClick={(): void => {
                dispatches.game({
                  type: 'changeProfile',
                  player
                });

                dispatches.params({
                  type: 'handleIcon',
                  operation: 'add',
                  icon: 'avatar',
                  player
                });
              }}
              type='button'
            >
              Load Profile
            </ButtonLoadProfile>
          )}
        </Info>
        <Info>{(state === 'running' || state === 'paused') && score}</Info>
      </ContainerInfo>
      {withProfile ? (
        <Avatar bg={user.photoURL} state={state} />
      ) : (
        <Options player={player} state={state} />
      )}
    </Container>
  );
};

export default React.memo(OptionsPlayer);
