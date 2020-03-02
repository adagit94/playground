import styled from 'styled-components';

export const ButtonPlayer = styled.input`
  width: 50px;
  height: 100%;
  border: none;
  font-size: 2rem;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonState = styled.input`
  width: 80px;
  height: 100%;
  font-weight: bold;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: 5px;
  color: #ffffff;
  background-color: unset;
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
    color: #000000;
    background-color: #ffffff;
    border-right-color: #000000;
    border-left-color: #000000;
  }

  &:focus {
    outline: none;
  }
`;
