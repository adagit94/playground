import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextParams,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  cursor: move;
`;

const Dimensions: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const dimensions = states.dimensions;
  let text: string;

  const Label = styled.label`
    color: ${dimensions === null ? '#f00' : '#000000'};
  `;

  switch (dimensions) {
    case 10:
      text = 'Small';
      break;
    case 20:
      text = 'Medium';
      break;
    case 30:
      text = 'Big';
      break;
    default:
      text = '';
  }

  return (
    <Container>
      <Label htmlFor='dimensions'>Dimensions:</Label>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatch({
            type: 'changeDimensions',
            dimensions: Number(e.target.value)
          })
        }
        value={typeof dimensions === 'number' ? String(dimensions) : ''}
        type='range'
        min='10'
        max='30'
        step='10'
        id='dimensions'
      />
      {text}
    </Container>
  );
};

export default React.memo(Dimensions);