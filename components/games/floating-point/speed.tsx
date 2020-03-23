import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsCommon } from '../../styled-components/inputs';

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

  return (
    <ContainerOption>
      <Label htmlFor='speed'>Speed:</Label>
      <InputOptionsCommon
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
      <div>{isDefined && `${speed}x`}</div>
    </ContainerOption>
  );
};

export default React.memo(Speed);
