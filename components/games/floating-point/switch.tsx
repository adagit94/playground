import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Switch: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  const Button = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${statesGame.state === 'off' ? '#f00' : '#7dfa00'};
  `;

  return (
    <Container>
      <Button
        onClick={(): void => {
          dispatchGame({
            type: 'changeState',
            state: statesGame.state === 'off' ? 'conf' : 'off'
          });
          if (statesGame.state !== 'off') dispatchParams({ type: 'reset' });
        }}
      />
    </Container>
  );
};

export default React.memo(Switch);
