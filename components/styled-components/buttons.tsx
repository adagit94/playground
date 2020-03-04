import styled from 'styled-components';

export const ButtonPlayer = styled.input`
  width: 35px;
  height: 35px;
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
  height: 35px;
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

export const ButtonForm = styled.input`
  padding: 10px;
  font-weight: bold;
  border-top: transparent;
  border-right: 2px solid #000000;
  border-bottom: transparent;
  border-left: 2px solid #000000;
  border-radius: 5px;
  color: #000000;
  background-color: #ffffff;
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
    border-right-color: #ffffff;
    border-left-color: #ffffff;
  }

  &:focus {
    outline: none;
  }
`;
