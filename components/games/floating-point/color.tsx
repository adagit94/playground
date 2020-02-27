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
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;

  input {
    width: 50px;
    padding: 0;
    border: 2px solid #ffffff;
    background-color: unset;

    :hover {
      cursor: pointer;
    }

    ::-webkit-color-swatch-wrapper {
      padding: 0;
    }
  }
`;

const Label = styled.label`
  height: 30px;
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
