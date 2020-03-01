import React, { useContext } from 'react';
import styled from 'styled-components';

import OptionsParameters from './options-parameters';
import Buttons from './buttons';
import Switch from './switch';
import Play from './play';
import Reset from './reset';
import AddPlayer from './add-player';
import RemovePlayer from './remove-player';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  border: 1px solid red;
  width: 20%;
  display: flex;
  flex-direction: column;
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

      <OptionsParameters />

      <Buttons>
        <Play />
        <Reset />
      </Buttons>
    </Container>
  );
};

export default React.memo(OptionsCommon);
