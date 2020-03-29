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
import { ContainerOptions } from '../../styled-components/containers';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 5px;
`;

const Divider = styled(DividerVertical)`
  background-color: ${(props): string => props.theme.inverted};
`;

const Overlap = styled(OverlapDisabled)`
  background-color: ${(props): string =>
    props.theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;

const OptionsCommon: React.FC = () => {
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
        <Divider />
        <Speed />
        {states.state !== 'conf' && <Overlap />}
      </ContainerOptions>

      <Buttons>
        {states.state !== 'off' && (
          <>
            <Play />
            <Reset />
          </>
        )}
      </Buttons>
    </Container>
  );
};

export default React.memo(OptionsCommon);
