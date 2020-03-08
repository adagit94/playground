import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsCommon } from '../../styled-components/inputs';
import { TextBlockValue } from '../../styled-components/text-blocks';

import {
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Dimensions: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatches);

  const dimensions = states.dimensions;
  const isDefined = typeof dimensions === 'number';

  const Label = styled.label`
    color: ${dimensions === null && '#f00'};
  `;

  const Input = styled(InputOptionsCommon)`
    &::-webkit-slider-runnable-track {
      background-color: ${(props): string => props.theme.inverted};
    }

    &::-webkit-slider-thumb {
      background-color: ${(props): string => props.theme.inverted};
    }
  `;

  return (
    <ContainerOption>
      <Label htmlFor='dimensions'>Dimensions:</Label>
      <Input
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
      <TextBlockValue>{isDefined && `${dimensions}px`}</TextBlockValue>
    </ContainerOption>
  );
};

export default React.memo(Dimensions);
