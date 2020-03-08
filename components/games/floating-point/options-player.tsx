import React, { useContext } from 'react';
import styled from 'styled-components';

import Shape from './shape';
import Color from './color';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import {
  ContainerRowCenter,
  ContainerColumn,
  ContainerOptions
} from '../../styled-components/containers';

import { ContextGame } from '../../../contexts/games/floating-point';
import { PropsOptions } from '../../../types/games/floating-point';

const Container = styled(ContainerColumn)`
  width: 50%;
`;

const ContainerPlayer = styled(ContainerRowCenter)`
  height: 25px;
`;

const Divider = styled(DividerVertical)`
  background-color: ${(props): string => props.theme.inverted};
`;

const Overlap = styled(OverlapDisabled)`
  background-color: ${(props): string =>
    props.theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;

const OptionsPlayer: React.FC<PropsOptions> = ({ player }): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <ContainerPlayer>
        <h3>{player}</h3>
      </ContainerPlayer>
      <ContainerOptions>
        <Shape player={player} />
        <Divider />
        <Color player={player} />
        {states.state !== 'conf' && <Overlap />}
      </ContainerOptions>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
