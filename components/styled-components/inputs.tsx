import styled from 'styled-components';

export const InputOptionsCommon = styled.input`
  -webkit-appearance: none;
  cursor: move;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    height: 1px;
  }

  &::-webkit-slider-thumb {
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

  &:active::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    margin-top: -10px;
  }
`;

export const InputForm = styled.input`
  border: 2px solid;
  border-radius: 5px;
  background: transparent;
  transition-property: box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :focus {
    box-shadow: 0 0 0 2px;
    outline: none;
  }
`;
