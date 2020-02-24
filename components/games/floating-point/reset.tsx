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
  width: 80px;
  height: 100%;
  cursor: pointer;
  font-weight: bold;
  border-top: none;
  border-right: 2px solid;
  border-bottom: none;
  border-left: 2px solid;
  border-radius: 5px;
  color: #ffffff;
  background-color: unset;
  transition-property: color, background-color, border-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    color: #000000;
    background-color: #ffffff;
    border-right-color: #000000;
    border-left-color: #000000;
  }
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
            dispatchGame({
              type: 'changeState',
              state: 'conf'
            });

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
