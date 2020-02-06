import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.input`
  border: none;
  width: 80px;
  height: 50px;
  cursor: pointer;
`;

const Reset: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  return (
    <Container>
      {statesGame.state !== 'off' && (
        <Button
          onClick={(): void => {
            dispatchGame({ type: 'reset' });
            dispatchParams({ type: 'reset' });
          }}
          value='Reset'
          type='button'
        />
      )}
    </Container>
  );
};

export default React.memo(Reset);
