import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContainerColumnCenter,
  ContainerOption
} from '../../styled-components/containers';

import { PropsOptions } from '../../../types/games/floating-point';
import {
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const ContainerInput = styled(ContainerColumnCenter)`
  height: 100px;
  width: 100px;
`;

const Input = styled.input`
  width: 50px;
  padding: 0;
  border: 2px solid ${(props): string => props.theme.inverted};
  background-color: unset;

  &:hover {
    cursor: pointer;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
`;

const Color: React.FC<PropsOptions> = ({ player }): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatches);

  return (
    <ContainerOption>
      <label htmlFor='color'>Color:</label>
      <ContainerInput>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            dispatches.params({
              type: 'changeColor',
              color: e.target.value,
              player
            })
          }
          value={states[player].color}
          type='color'
          id='color'
        />
      </ContainerInput>
    </ContainerOption>
  );
};

export default React.memo(Color);
