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

const Speed: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const Label = styled.label`
    color: ${states.speed === null ? '#f00' : '#000000'};
  `;

  return (
    <Container>
      <Label htmlFor='speed'>Speed:</Label>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatch({ type: 'changeSpeed', speed: Number(e.target.value) })
        }
        value={typeof states.speed === 'number' ? String(states.speed) : ''}
        type='range'
        min='1'
        max='5'
        id='speed'
      />
      {states.speed > 0 && states.speed + 'x'}
    </Container>
  );
};

export default React.memo(Speed);
