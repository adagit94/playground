import React, { useContext } from 'react';
import styled from 'styled-components';

import { ActionsParams } from '../../../types/games/floating-point';

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
`;

const Input = styled.input`
  width: 50px;
  cursor: pointer;
`;

const Color = ({ player }): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch: React.Dispatch<ActionsParams> = useContext(
    ContextDispatchParams
  );

  const Label = styled.label`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${states[player].color === undefined ? '#f00' : '#000000'};
  `;

  return (
    <Container>
      <Label htmlFor='color'>Color:</Label>
      <InputContainer>
        <Input
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
