import React, { useContext } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import { ContextGame } from '../../../contexts/games/floating-point';

const Monitor: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);

  const Container = styled.div`
    height: 70%;
    position: relative;
    visibility: ${statesGame.state === 'running' ||
    statesGame.state === 'paused'
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
