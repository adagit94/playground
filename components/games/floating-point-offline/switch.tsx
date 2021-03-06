import { useContext, memo } from 'react';
import styled from 'styled-components';

import { borderRadiusButton } from 'components/styled-components/_variables';

import {
  ContextGame,
  ContextDispatchesFP
} from 'contexts/games/floating-point-offline';

const Switch: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatches = useContext(ContextDispatchesFP);

  const { state } = statesGame;

  const Button = styled.button`
    width: 25px;
    height: 35px;
    margin: 0 20px;
    border: none;
    border-radius: ${borderRadiusButton};
    transform: ${state !== 'off' ? 'rotateX(65deg)' : 'rotateX(25deg)'};
    box-shadow: ${state !== 'off'
      ? '0 30px 0 0 #009900'
      : '0 -5px 0 0 #990000'};
    background-color: ${state !== 'off' ? '#00ff00' : '#ff0000'};

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
            state: state === 'off' ? 'conf' : 'off'
          });

          if (state !== 'off') dispatches.params({ type: 'reset' });
        }}
        type='button'
      />
    </>
  );
};

export default memo(Switch);
