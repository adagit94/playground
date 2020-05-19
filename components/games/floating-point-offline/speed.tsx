import { useContext, memo } from 'react';
import styled from 'styled-components';

import { ContainerOption } from 'components/styled-components/containers';
import {
  InputOptionsCommon,
  InputOptionsLabel,
  InputOptionsValue
} from 'components/styled-components/inputs';

import {
  ContextParams,
  ContextDispatchesFP
} from 'contexts/games/floating-point-offline';

const Speed: React.FC = (): JSX.Element => {
  const statesParams = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const { speed } = statesParams;

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
        value={speed ? String(speed) : ''}
        type='range'
        min='1'
        max='5'
        step='2'
        id='speed'
      />
      <InputOptionsValue>{speed && `${speed}x`}</InputOptionsValue>
    </ContainerOption>
  );
};

export default memo(Speed);
