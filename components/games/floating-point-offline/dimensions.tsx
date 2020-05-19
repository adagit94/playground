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

const Dimensions: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const { dimensions } = states;

  const Label = styled(InputOptionsLabel)`
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
        value={dimensions ? String(dimensions) : ''}
        type='range'
        min='20'
        max='30'
        step='5'
        id='dimensions'
      />
      <InputOptionsValue>{dimensions && `${dimensions}px`}</InputOptionsValue>
    </ContainerOption>
  );
};

export default memo(Dimensions);
