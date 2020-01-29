import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextDispatchGame,
  ContextDispatchParams
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

const Reset = (): JSX.Element => {
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  return (
    <Container>
      <Button
        onClick={(): void => {
          dispatchGame({ type: 'changeState', state: 'conf' });
          dispatchParams({ type: 'reset' });
        }}
        value='Reset'
        type='button'
      />
    </Container>
  );
};

export default React.memo(Reset);
