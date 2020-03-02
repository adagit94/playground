import React, { useContext } from 'react';

import { ContainerButton } from '../../styled-components/containers';
import { ButtonState } from '../../styled-components/buttons';

import {
  ContextDispatchGame,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Reset: React.FC = (): JSX.Element => {
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  return (
    <ContainerButton>
      <ButtonState
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
    </ContainerButton>
  );
};

export default React.memo(Reset);
