import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsCommon } from '../../styled-components/inputs';
import { TextBlockValue } from '../../styled-components/text-blocks';

import {
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Speed: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatches);

  const speed = states.speed;
  const isDefined = typeof speed === 'number';

  const Label = styled.label`
    color: ${speed === null && '#f00'};
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
      <Label htmlFor='speed'>Speed:</Label>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatches.params({
            type: 'changeSpeed',
            speed: Number(e.target.value)
          })
        }
        value={isDefined ? String(speed) : ''}
        type='range'
        min='1'
        max='5'
        step='2'
        id='speed'
      />
      <TextBlockValue>{isDefined && `${speed}x`}</TextBlockValue>
    </ContainerOption>
  );
};

export default React.memo(Speed);
