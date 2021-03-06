import { useContext, memo } from 'react';
import styled from 'styled-components';

import Icons from './icons';
import Color from './color';

import { DividerVertical } from 'components/styled-components/dividers';
import { OverlapDisabled } from 'components/styled-components/overlaps';
import { ContainerOptions } from 'components/styled-components/containers';
import {
  paddingButton,
  borderRadiusButton,
  heightContainerOptionsItem
} from 'components/styled-components/_variables';

import { ContextFirebase } from 'contexts/firebase';
import { ContextDispatchesFP } from 'contexts/games/floating-point-offline';
import {
  ContextGame,
  ContextPlayers
} from 'contexts/games/floating-point-offline';

import {
  PropsAvatar,
  PropsOptionsPlayer,
  PropsOptions
} from 'types/games/floating-point-offline';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 5px;
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: ${heightContainerOptionsItem};
`;

const Info = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonLoadProfile = styled.button`
  padding: ${paddingButton};
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: ${borderRadiusButton};
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
      {state !== 'conf' && <OverlapDisabled />}
    </ContainerAvatar>
  );
};

const Options: React.FC<PropsOptions> = ({ player, state }): JSX.Element => {
  return (
    <ContainerOptions>
      <Icons player={player} />
      <DividerVertical color='inverted' />
      <Color player={player} />
      {state !== 'conf' && <OverlapDisabled />}
    </ContainerOptions>
  );
};

const OptionsPlayer: React.FC<PropsOptionsPlayer> = ({ player }) => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesFirebase = useContext(ContextFirebase);
  const dispatches = useContext(ContextDispatchesFP);

  const { state, profile } = statesGame;
  const { score } = statesPlayers[player];
  const { user } = statesFirebase;

  const withProfile = profile === player;

  return (
    <Container>
      <ContainerInfo>
        <Info>{player}</Info>
        <Info>
          {withProfile && user.displayName}

          {state === 'conf' && user !== undefined && profile === undefined && (
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
        <Info>{(state === 'run' || state === 'paused') && score}</Info>
      </ContainerInfo>
      {withProfile && <Avatar bg={user.photoURL} state={state} />}

      {!withProfile && <Options player={player} state={state} />}
    </Container>
  );
};

export default memo(OptionsPlayer);
