import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import $ from 'jquery';

import { ContainerRowAround } from '../../styled-components/containers';
import { FormStandard } from '../../styled-components/forms';
import { ButtonSubmit } from '../../styled-components/buttons';
import { InputForm } from '../../styled-components/inputs';

const showForm = (): void => {
  $('#log-in-form').slideToggle(100, 'linear');
};

const LogIn: React.FC = (): JSX.Element => {
  const Container = styled.div`
    position: relative;
    width: 150px;
    height: 100%;
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
  `;

  const Form = styled(FormStandard)`
    justify-content: space-around;
    position: absolute;
    top: 75px;
    right: 0;
    width: 300px;
    height: 150px;
    z-index: 1;
    background-color: ${(props): string => props.theme.inverted};
  `;

  const Input = styled(InputForm)`
    color: ${(props): string => props.theme.background};
    border-color: ${(props): string => props.theme.background};
  `;

  const ButtonToggle = styled.input`
    width: 100%;
    height: 100%;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
    transition-property: font-size;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    &:hover {
      cursor: pointer;
      font-size: 1.3rem;
    }

    &:focus {
      outline: none;
    }
  `;

  const ButtonForm = styled(ButtonSubmit)`
    border-right-color: ${(props): string => props.theme.background};
    border-left-color: ${(props): string => props.theme.background};
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};

    &:hover {
      border-right-color: ${(props): string => props.theme.inverted};
      border-left-color: ${(props): string => props.theme.inverted};
      color: ${(props): string => props.theme.inverted};
      background-color: ${(props): string => props.theme.background};
    }
  `;

  const LinkTxt = styled.a`
    text-decoration: none;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  `;

  return (
    <Container>
      <ButtonToggle onClick={showForm} value='Log in' type='button' />
      <Form style={{ display: 'none' }} id='log-in-form'>
        <ContainerRowAround>
          <label htmlFor='username'>Username: </label>
          <Input type='text' name='username' id='username' required />
        </ContainerRowAround>
        <ContainerRowAround>
          <label htmlFor='password'>Password: </label>
          <Input type='password' name='password' id='password' required />
        </ContainerRowAround>
        <ContainerRowAround>
          <ButtonForm value='Log in' type='button' />
        </ContainerRowAround>
        <ContainerRowAround>
          <Link href='/reset-password'>
            <LinkTxt>Reset password</LinkTxt>
          </Link>
          <Link href='/create-account'>
            <LinkTxt>Create account</LinkTxt>
          </Link>
        </ContainerRowAround>
      </Form>
    </Container>
  );
};

export default LogIn;
