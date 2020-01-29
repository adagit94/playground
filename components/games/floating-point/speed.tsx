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

const Speed = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  return (
    <Container>
      <label htmlFor='speed'>Speed:</label>
      <input
        onChange={(e): void =>
          dispatch({ type: 'changeSpeed', speed: Number(e.target.value) })
        }
        value={states.speed}
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
