import React, { useContext } from 'react';
import styled from 'styled-components';

import Icons from './icons';
import Color from './color';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import { ContainerOptions } from '../../styled-components/containers';

import { PropsOptions } from '../../../types/games/floating-point';
import {
  ContextGame,
  ContextPlayers
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 5px;
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 25px;
`;

const Divider = styled(DividerVertical)`
  background-color: ${(props): string => props.theme.inverted};
`;

const Overlap = styled(OverlapDisabled)`
  background-color: ${(props): string =>
    props.theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;

const OptionsPlayer: React.FC<PropsOptions> = ({ player }) => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  return (
    <Container>
      <ContainerInfo>
        <h3>{player}</h3>
      </ContainerInfo>
      <ContainerInfo>
        {(statesGame.state === 'running' || statesGame.state === 'paused') &&
          statesPlayers[player].score}
      </ContainerInfo>
      <ContainerOptions>
        <Icons player={player} />
        <Divider />
        <Color player={player} />
        {statesGame.state !== 'conf' && <Overlap />}
      </ContainerOptions>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
