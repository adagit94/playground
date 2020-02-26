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

  const Button = styled.input`
    width: 40%;
    height: 100%;
    border: none;
    border-radius: 5px;
    transform: ${state !== 'off' && 'rotateX(45deg)'};
    box-shadow: ${state !== 'off' && '0 15px 0 0 #32cd3280'};
    background-color: ${state !== 'off' ? '#32cd32' : '#ff0000'};
    color: #ffffff;
  `;

  return (
    <Container>
      <Button
        onClick={(): void => {
          dispatchGame({
            type: 'changeState',
            state: state !== 'off' ? 'off' : 'conf'
          });

          state !== 'off' && dispatchParams({ type: 'reset' });
        }}
        type='button'
      />
    </Container>
  );
};

export default React.memo(Switch);
