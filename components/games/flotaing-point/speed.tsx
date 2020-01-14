import React, { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Speed = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatch = useContext(ContextDispatchGame);

  const speed = states.speed;

  return (
    <Container>
      <label htmlFor='speed'>Speed:</label>
      <input
        onChange={(e): void =>
          dispatch({ type: 'changeSpeed', speed: Number(e.target.value) })
        }
        value={speed}
        type='range'
        min='1'
        max='5'
        step='2'
        id='speed'
      />
      {speed > 0 && speed + 'x'}
    </Container>
  );
};

export default React.memo(Speed);
