import styled from 'styled-components';

import {
  paddingButton,
  paddingFormInput,
  borderRadiusButton,
  borderRadiusWindow,
  borderWidthFormInput
} from './_variables';

export const FormLabel = styled.label`
  width: 75px;
`;

export const FormInput = styled.input`
  border: ${borderWidthFormInput} solid;
  padding: ${paddingFormInput};
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
  padding: ${paddingButton};
  font-weight: bold;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: ${borderRadiusButton};
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

export const FormButtonInput = styled.button`
  padding: ${paddingButton};
  font-weight: bold;
  border: ${borderWidthFormInput} solid
    ${(props): string => props.theme.background};
  border-radius: ${borderRadiusButton};
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
  transition-property: color, background-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
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
  padding: ${paddingFormInput};
  border: none;
  border-radius: ${borderRadiusButton};
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const FormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
  color: ${(props): string => props.theme.background};
`;

export const FormRowHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  border-radius: ${borderRadiusWindow};

  ul {
    padding: 0;
    margin: 0;
  }
`;
