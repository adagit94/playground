import React, { useContext } from 'react';
import styled from 'styled-components';

import Dimensions from './dimensions';
import Speed from './speed';
import Buttons from './buttons';
import Switch from './switch';
import Play from './play';
import Reset from './reset';
import AddPlayer from './add-player';
import RemovePlayer from './remove-player';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import {
  ContainerColumn,
  ContainerOptions
} from '../../styled-components/containers';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled(ContainerColumn)`
  width: 20%;
`;

const OptionsCommon: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);

  const { state, players } = states;

  return (
    <Container>
      <Buttons>
        {state === 'conf' &&
          (players.includes('left') ? (
            <RemovePlayer pos='left' />
          ) : (
            <AddPlayer pos='left' />
          ))}

        <Switch />

        {state === 'conf' &&
          (players.includes('right') ? (
            <RemovePlayer pos='right' />
          ) : (
            <AddPlayer pos='right' />
          ))}
      </Buttons>

      <ContainerOptions>
        <Dimensions />
        <DividerVertical />
        <Speed />
        {states.state !== 'conf' && <OverlapDisabled />}
      </ContainerOptions>

      <Buttons>
        <Play />
        <Reset />
      </Buttons>
    </Container>
  );
};

export default React.memo(OptionsCommon);
