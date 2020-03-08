import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonState } from '../../styled-components/buttons';

import { ContextDispatches } from '../../../contexts/games/floating-point';

const Button = styled(ButtonState)`
  margin-left: 10px;
  color: ${(props): string => props.theme.inverted};

  &:hover {
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
    border-right-color: ${(props): string => props.theme.inverted};
    border-left-color: ${(props): string => props.theme.inverted};
  }
`;

const Reset: React.FC = (): JSX.Element => {
  const dispatches = useContext(ContextDispatches);

  return (
    <>
      <Button
        onClick={(): void => {
          dispatches.game({
            type: 'changeState',
            state: 'conf'
          });

          dispatches.params({ type: 'reset' });
        }}
        value='Reset'
        type='button'
      />
    </>
  );
};

export default React.memo(Reset);
