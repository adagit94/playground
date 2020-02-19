import React, { useContext } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import { ContextGame } from '../../../contexts/games/floating-point';

const Monitor: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);

  const state = statesGame.state[0];

  const Container = styled.div`
    height: 70%;
    position: relative;
    visibility: ${state === 'running' ||
    state === 'paused' ||
    state === 'recalc'
      ? 'visible'
      : 'hidden'};
  `;

  return (
    <Container id='monitor'>
      <Players />
      <Point />
    </Container>
  );
};

export default React.memo(Monitor);
