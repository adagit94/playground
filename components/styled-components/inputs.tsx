import styled from 'styled-components';

import { InputCustomRadioButtonProps } from 'types/styled-components';

export const InputOptionsCommon = styled.input`
  -webkit-appearance: none;
  cursor: move;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    height: 1px;
    background-color: ${({ theme }): string => theme.inverted};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    margin-top: -7.5px;
    border-radius: 100%;
    background-color: ${({ theme }): string => theme.inverted};
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

export const InputOptionsLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25px;
`;

export const InputOptionsValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25px;
`;

export const InputCustomRadioButton = styled.button<
  InputCustomRadioButtonProps
>`
  width: 15px;
  height: 15px;
  border: 2px solid ${({ theme }): string => theme.background};
  border-radius: 100%;
  background-color: ${({ checked, theme }): string =>
    checked ? theme.background : theme.inverted};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
