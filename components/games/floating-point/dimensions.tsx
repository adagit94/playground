import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Dimensions = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatch = useContext(ContextDispatchGame);
  let text = '';

  switch (states.dimensions) {
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
      <label htmlFor='dimensions'>Dimensions: </label>
      <input
        onChange={(e): void =>
          dispatch({
            type: 'changeDimensions',
            dimensions: Number(e.target.value)
          })
        }
        value={states.dimensions}
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
