import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import $ from 'jquery';

const Container = styled.div`
  position: relative;
  color: #000000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 10;
  position: absolute;
  top: 75px;
  right: 0;
  width: 300px;
  height: 150px;
  background-color: #ffffff;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  input {
    &[type='text'],
    &[type='password'] {
      border: 2px solid #000000;
      border-radius: 5px;
      transition-property: box-shadow;
      transition-duration: 0.1s;
      transition-timing-function: linear;

      :focus {
        box-shadow: 0 0 0 2px #000000;
        outline: none;
      }
    }
  }
`;

const FormBtn = styled.input`
  width: 150px;
  height: 100%;
  font-size: 1rem;
  border: none;
  background-color: #ffffff;
  transition-property: font-size;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    font-size: 1.3rem;
  }
`;

const LogInBtn = styled.input`
  padding: 10px;
  border-top: transparent;
  border-right: 2px solid #000000;
  border-bottom: transparent;
  border-left: 2px solid #000000;
  border-radius: 5px;
  background-color: #ffffff;
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    color: #ffffff;
    background-color: #000000;
    border-right-color: #ffffff;
    border-left-color: #ffffff;
  }
`;

const LinkTxt = styled.a`
  color: #000000;

  :hover {
    font-weight: bold;
  }
`;

const showForm = (): void => {
  $('#log-in-form').slideToggle(100, 'linear');
};

const LogIn: React.FC = (): JSX.Element => {
  return (
    <Container>
      <FormBtn onClick={showForm} value='Log in' type='button' />
      <Form style={{ display: 'none' }} id='log-in-form'>
        <Row>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' required />
        </Row>
        <Row>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' required />
        </Row>
        <Row>
          <LogInBtn value='Log in' type='button' />
        </Row>
        <Row>
          <LinkTxt href=''>Reset password</LinkTxt>
          <Link href='/create-account'>
            <LinkTxt>Create account</LinkTxt>
          </Link>
        </Row>
      </Form>
    </Container>
  );
};

export default React.memo(LogIn);
