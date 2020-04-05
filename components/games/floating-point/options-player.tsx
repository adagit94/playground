import React, { useContext } from 'react';
import styled from 'styled-components';

import Icons from './icons';
import Color from './color';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import { ContainerOptions } from '../../styled-components/containers';

import { ContextUser } from '../../../contexts/user';
import { ContextAuth0 } from '../../../contexts/auth0';
import {
  ContextGame,
  ContextPlayers
} from '../../../contexts/games/floating-point';

import {
  PropsOptionsPlayer,
  PropsOptions
} from '../../../types/games/floating-point';
import { ContextDispatchesFP } from '../../../contexts/games/floating-point';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
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
  background-color: ${(props): string => props.theme.background};
`;

const Overlap = styled(OverlapDisabled)`
  background-color: ${(props): string =>
    props.theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;

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
  const statesAuth0 = useContext(ContextAuth0);
  const dispatches = useContext(ContextDispatchesFP);

  const state = statesGame.state;
  const username = statesUser.username;
  const user = statesAuth0.user;
  const { score, profile } = statesPlayers[player];

  const Avatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-image: url(${user && user.picture});
  `;

  return (
    <Container>
      <Info>
        <h3>{player}</h3>
        <div>
          {profile && username}

          {!profile && (
            <ButtonLoadProfile
              onClick={(): void => {
                dispatches.players({
                  type: 'withProfile',
                  value: true,
                  player
                });
              }}
              type='button'
            >
              Load Profile
            </ButtonLoadProfile>
          )}
        </div>
      </Info>
      <Info>{(state === 'running' || state === 'paused') && score}</Info>
      {profile ? <Avatar /> : <Options player={player} state={state} />}
    </Container>
  );
};

export default React.memo(OptionsPlayer);
