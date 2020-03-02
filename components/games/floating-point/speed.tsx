import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsCommon } from '../../styled-components/inputs';
import { LabelOption } from '../../styled-components/labels';

import {
  ContextParams,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Speed: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const speed = states.speed;
  const isDefined = typeof speed === 'number';

  const Label = styled(LabelOption)`
    color: ${speed === null && '#f00'};
  `;

  return (
    <ContainerOption>
      <Label htmlFor='speed'>Speed:</Label>
      <InputOptionsCommon
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatch({ type: 'changeSpeed', speed: Number(e.target.value) })
        }
        value={isDefined ? String(speed) : ''}
        type='range'
        min='1'
        max='5'
        id='speed'
      />
      {isDefined && `${speed}x`}
    </ContainerOption>
  );
};

export default React.memo(Speed);
