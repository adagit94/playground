import styled from 'styled-components';

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: ${(props): string => props.theme.background};
`;

export const FormInput = styled.input`
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

export const FormButton = styled.button`
  padding: 5px;
  font-weight: bold;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
    border-right-color: ${(props): string => props.theme.inverted};
    border-left-color: ${(props): string => props.theme.inverted};
    color: ${(props): string => props.theme.inverted};
    background-color: ${(props): string => props.theme.background};
  }

  &:focus {
    outline: none;
  }
`;

export const FormPage = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const FormContainerPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

export const FormRowPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
  color: ${(props): string => props.theme.background};
`;
