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

const Size: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const { size } = states;

  const Label = styled(InputOptionsLabel)`
    color: ${size === null && '#f00'};
  `;

  return (
    <ContainerOption>
      <Label htmlFor='size'>Size:</Label>
      <InputOptionsCommon
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatches.params({
            type: 'changeDimensions',
            size: Number(e.target.value)
          })
        }
        value={size ? String(size) : ''}
        type='range'
        min='20'
        max='30'
        step='5'
        id='size'
      />
      <InputOptionsValue>{size && `${size}px`}</InputOptionsValue>
    </ContainerOption>
  );
};

export default memo(Size);
