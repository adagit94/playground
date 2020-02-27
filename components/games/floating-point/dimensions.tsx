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

const Dimensions: React.FC = (): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const dimensions = states.dimensions;
  const isDefined = typeof dimensions === 'number';

  const Label = styled.label`
    height: 30px;
    color: ${dimensions === null && '#f00'};
  `;

  return (
    <Container>
      <Label htmlFor='dimensions'>Dimensions:</Label>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          dispatch({
            type: 'changeDimensions',
            dimensions: Number(e.target.value)
          })
        }
        value={isDefined ? String(dimensions) : ''}
        type='range'
        min='10'
        max='30'
        step='5'
        id='dimensions'
      />
      {isDefined && `${dimensions}px`}
    </Container>
  );
};

export default React.memo(Dimensions);
