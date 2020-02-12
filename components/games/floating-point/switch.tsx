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
  align-items: center;
`;

const Switch: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  const state = statesGame.state;

  const Button = styled.button`
    width: 30px;
    height: 100%;
    border: none;
    background-color: ${state === 'off' ? '#f00' : '#7dfa00'};
    cursor: pointer;
  `;

  return (
    <Container>
      <Button
        onClick={(): void => {
          dispatchGame({
            type: 'changeState',
            state: state === 'off' ? 'conf' : 'off'
          });
          if (state === 'off') dispatchParams({ type: 'reset' });
        }}
      />
    </Container>
  );
};

export default React.memo(Switch);
