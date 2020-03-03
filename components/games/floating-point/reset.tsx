import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonState } from '../../styled-components/buttons';

import {
  ContextDispatchGame,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Button = styled(ButtonState)`
  margin-left: 10px;
`;

const Reset: React.FC = (): JSX.Element => {
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  return (
    <>
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
    </>
  );
};

export default React.memo(Reset);
