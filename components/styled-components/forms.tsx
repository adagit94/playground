import styled from 'styled-components';

export const FormInput = styled.input`
  border: 2px solid;
  padding: 2.5px;
  border-radius: 5px;
  background: ${(props): string => props.theme.inverted};
  color: ${(props): string => props.theme.background};
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

export const FormSocialProvider = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
  padding: 2.5px;
  border: none;
  border-radius: 5px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

export const FormContainer = styled.div`
  height: 100%;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
  color: ${(props): string => props.theme.background};
`;

export const FormContainerWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25%;
`;

export const FormWindowValidation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 2px solid;
  border-radius: 5px;

  ul {
    padding: 0;
    margin: 0;
  }
`;

export const FormWindowError = styled.div`
  text-align: center;
  color: #ff0000;
`;
