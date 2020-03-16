import React, { useContext } from 'react';
import styled from 'styled-components';

import Icons from './icons';
import Color from './color';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import { ContainerOptions } from '../../styled-components/containers';

import { ContextGame } from '../../../contexts/games/floating-point';
import { PropsOptions } from '../../../types/games/floating-point';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 5px;
`;

const ContainerPlayer = styled.div`
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

const OptionsPlayer: React.FC<PropsOptions> = ({ player }): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <ContainerPlayer>
        <h3>{player}</h3>
      </ContainerPlayer>
      <ContainerOptions>
        <Icons player={player} />
        <Divider />
        <Color player={player} />
        {states.state !== 'conf' && <Overlap />}
      </ContainerOptions>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
