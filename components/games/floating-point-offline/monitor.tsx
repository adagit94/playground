import React, { useContext } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import { ContextGame } from '../../../contexts/games/floating-point-offline';

const Container = styled.div`
  height: 55%;
  position: relative;
`;

const Monitor: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);

  const state = statesGame.state;

  return (
    <Container id='monitor'>
      {state !== 'off' && state !== 'conf' && (
        <>
          <Players />
          <Point />
        </>
      )}
    </Container>
  );
};

export default React.memo(Monitor);
