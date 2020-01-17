import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextPlayers,
  ContextDispatchPlayers
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Input = styled.input`
  width: 50px;
`;

const Color = ({ id }): JSX.Element => {
  const states = useContext(ContextPlayers);
  const dispatch = useContext(ContextDispatchPlayers);

  const Label = styled.label`
    flex: 5 5 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${states[id].color === undefined ? '#f00' : '#000000'};
  `;

  return (
    <Container>
      <Label htmlFor='color'>Color:</Label>
      <InputContainer>
        <Input
          onChange={(e): void =>
            dispatch({ type: 'changeColor', color: e.target.value, player: id })
          }
          value={states[id].color}
          type='color'
          id='color'
        />
      </InputContainer>
    </Container>
  );
};

export default React.memo(Color);
