import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsCommon } from '../../styled-components/inputs';
import { LabelOption } from '../../styled-components/labels';

import {
  ContextParams,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Dimensions: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const dimensions = states.dimensions;
  const isDefined = typeof dimensions === 'number';

  const Label = styled(LabelOption)`
    color: ${dimensions === null && '#f00'};
  `;

  return (
    <ContainerOption>
      <Label htmlFor='dimensions'>Dimensions:</Label>
      <InputOptionsCommon
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatch({
            type: 'changeDimensions',
            dimensions: Number(e.target.value)
          })
        }
        value={isDefined ? String(dimensions) : ''}
        type='range'
        min='10'
        max='30'
        step='5'
        id='dimensions'
      />
      {isDefined && `${dimensions}px`}
    </ContainerOption>
  );
};

export default React.memo(Dimensions);
