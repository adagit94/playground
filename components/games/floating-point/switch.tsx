import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Switch = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatch = useContext(ContextDispatchGame);

  const Button = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${states.isTurnedOn ? '#7dfa00' : '#f00'};
  `;

  return (
    <Container>
      <Button
        onClick={(): void =>
          dispatch({ type: states.isTurnedOn ? 'switchOff' : 'switchOn' })
        }
      />
    </Container>
  );
};

export default React.memo(Switch);
