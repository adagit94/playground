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
    -webkit-appearance: none;
    cursor: move;

    :focus {
      outline: none;
    }

    ::-webkit-slider-runnable-track {
      width: 100%;
      height: 1px;
      background: #ffffff;
    }

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      margin-top: -7.5px;
      border-radius: 100%;
      background: #ffffff;
      transition-property: width, height;
      transition-duration: 0.1s;
      transition-timing-function: linear;
    }

    :active::-webkit-slider-thumb {
      width: 20px;
      height: 20px;
      margin-top: -10px;
    }
  }
`;

const Speed: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const speed = states.speed;
  const isDefined = typeof speed === 'number';

  const Label = styled.label`
    color: ${speed === null && '#f00'};
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
        step='2'
        id='speed'
      />
      {isDefined && speed + 'x'}
    </Container>
  );
};

export default React.memo(Speed);
