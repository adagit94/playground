import React, { useContext } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import { ContextGame } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  height: 70%;
  position: relative;
`;

const Monitor: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);

  const { state } = statesGame;

  return (
    <Container id='monitor'>
      {state === 'running' && (
        <>
          <Players />
          <Point />
        </>
      )}
    </Container>
  );
};

export default React.memo(Monitor);
