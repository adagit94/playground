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

const Switch = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  const Button = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${states.state !== 'off' ? '#7dfa00' : '#f00'};
  `;

  return (
    <Container>
      <Button
        onClick={(): void => {
          if (states.state !== 'off') {
            dispatchGame({ type: 'switchOff' });
            dispatchParams({ type: 'reset' });
          } else {
            dispatchGame({ type: 'changeState', state: 'conf' });
          }
        }}
      />
    </Container>
  );
};

export default React.memo(Switch);
