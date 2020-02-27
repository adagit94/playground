import React, { useContext } from 'react';
import styled from 'styled-components';

import Switch from './switch';
import Play from './play';
import Reset from './reset';
import AddPlayer from './add-player';
import RemovePlayer from './remove-player';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Buttons: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);

  const state = states.state;
  const players = states.players;

  return (
    <Container>
      {state === 'conf' &&
        (players.includes('left') ? (
          <RemovePlayer pos='left' />
        ) : (
          <AddPlayer pos='left' />
        ))}

      {state !== 'off' && <Play />}

      <Switch />

      {state !== 'off' && <Reset />}

      {state === 'conf' &&
        (players.includes('right') ? (
          <RemovePlayer pos='right' />
        ) : (
          <AddPlayer pos='right' />
        ))}
    </Container>
  );
};

export default React.memo(Buttons);
