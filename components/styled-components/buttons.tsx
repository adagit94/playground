import styled from 'styled-components';

export const ButtonOptions = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 100%;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonSubmit = styled.button`
  padding: 10px;
  font-weight: bold;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: 5px;
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
