import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsCommon } from '../../styled-components/inputs';

import {
  ContextParams,
  ContextDispatchesFP
} from '../../../contexts/games/floating-point';

const Dimensions: React.FC = () => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const dimensions = states.dimensions;
  const isDefined = typeof dimensions === 'number';

  const Label = styled.label`
    color: ${dimensions === null && '#f00'};
  `;

  return (
    <ContainerOption>
      <Label htmlFor='dimensions'>Dimensions:</Label>
      <InputOptionsCommon
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatches.params({
            type: 'changeDimensions',
            dimensions: Number(e.target.value)
          })
        }
        value={isDefined ? String(dimensions) : ''}
        type='range'
        min='20'
        max='30'
        step='5'
        id='dimensions'
      />
      <div>{isDefined && `${dimensions}px`}</div>
    </ContainerOption>
  );
};

export default React.memo(Dimensions);
