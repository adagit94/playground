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

  input {
    cursor: move;
  }
`;

const Speed: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const speed = states.speed;
  const isDefined = typeof speed === 'number';

  const Label = styled.label`
    color: ${speed === null ? '#f00' : '#000000'};
  `;

  return (
    <Container>
      <Label htmlFor='speed'>Speed:</Label>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatch({ type: 'changeSpeed', speed: Number(e.target.value) })
        }
        value={isDefined ? String(speed) : ''}
        type='range'
        min='1'
        max='5'
        id='speed'
      />
      {isDefined && speed + 'x'}
    </Container>
  );
};

export default React.memo(Speed);
