import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Switch: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  const state = statesGame.state;

  const Button = styled.input`
    width: 25px;
    height: 50px;
    margin: 0 20px;
    border: none;
    border-radius: 5px;
    transform: ${state !== 'off' ? 'rotateX(65deg)' : 'rotateX(25deg)'};
    box-shadow: ${state !== 'off'
      ? '0 30px 0 0 #32cd3280'
      : '0 -5px 0 0 #ff000080'};
    background-color: ${state !== 'off' ? '#32cd32' : '#ff0000'};
    color: #ffffff;

    :hover {
      cursor: pointer;
    }

    :focus {
      outline: none;
    }
  `;

  return (
    <>
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
    </>
  );
};

export default React.memo(Switch);
