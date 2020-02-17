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
  align-items: center;
`;

const InputContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  input {
    width: 50px;
    cursor: pointer;
  }
`;

const Label = styled.label`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: '#000000';
`;

const Color = ({ player }): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  return (
    <Container>
      <Label htmlFor='color'>Color:</Label>
      <InputContainer>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            dispatch({ type: 'changeColor', color: e.target.value, player })
          }
          value={states[player].color}
          type='color'
          id='color'
        />
      </InputContainer>
    </Container>
  );
};

export default React.memo(Color);
