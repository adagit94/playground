import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Switch: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatches = useContext(ContextDispatches);

  const state = statesGame.state;

  const Button = styled.input`
    width: 25px;
    height: 35px;
    margin: 0 20px;
    border: none;
    border-radius: 5px;
    transform: ${state !== 'off' ? 'rotateX(65deg)' : 'rotateX(25deg)'};
    box-shadow: ${state !== 'off'
      ? '0 30px 0 0 #32cd3280'
      : '0 -5px 0 0 #ff000080'};
    background-color: ${state !== 'off' ? '#32cd32' : '#ff0000'};
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `;

  return (
    <>
      <Button
        onClick={(): void => {
          dispatches.game({
            type: 'changeState',
            state: state !== 'off' ? 'off' : 'conf'
          });

          state !== 'off' && dispatches.params({ type: 'reset' });
        }}
        type='button'
      />
    </>
  );
};

export default React.memo(Switch);
