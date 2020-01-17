import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextCallbacks
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.input`
  border: none;
  width: 80px;
  height: 50px;
`;

const Play = (): JSX.Element => {
  const states = useContext(ContextGame);
  const callbacks = useContext(ContextCallbacks);

  return (
    <Container>
      <Button
        onClick={callbacks.handlePlay}
        value={states.isPaused || !states.isRunning ? 'Play' : 'Pause'}
        type='button'
      />
    </Container>
  );
};

export default React.memo(Play);
