import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import {
  InputOptionsCommon,
  InputOptionsLabel,
  InputOptionsValue
} from '../../styled-components/inputs';

import {
  ContextParams,
  ContextDispatchesFP
} from '../../../contexts/games/floating-point';

const Speed: React.FC = () => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const speed = states.speed;
  const isDefined = typeof speed === 'number';

  const Label = styled(InputOptionsLabel)`
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
      <InputOptionsValue>{isDefined && `${speed}x`}</InputOptionsValue>
    </ContainerOption>
  );
};

export default React.memo(Speed);
