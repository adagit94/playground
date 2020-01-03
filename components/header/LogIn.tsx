import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import $ from 'jquery';

const Container = styled.div`
  position: relative;
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
  background-color: #000000;
  color: #ffffff;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    input {
      border: none;
      border-radius: 5px;
      transition-property: box-shadow;
      transition-duration: 0.1s;
      transition-timing-function: linear;

      :focus {
        box-shadow: 0 0 0 2px #ffffff;
        outline: none;
      }
    }
  }
`;

const FormBtn = styled.button`
  width: 150px;
  height: 100%;
  background-color: #000000;
  color: #ffffff;
  border: none;
  transition-property: font-weight, font-size;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const LogInBtn = styled.button`
  width: 70px;
  border-top: none;
  border-bottom: none;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  border-radius: 5px;
  color: #ffffff;
  background-color: #000000;
  padding: 5px;
  transition-property: color, background-color, border-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    color: #000000;
    background-color: #ffffff;
    border-color: #000000;
    cursor: pointer;
  }
`;

const LinkTxt = styled.a`
  color: #ffffff;
  text-decoration: none;

  :hover {
    cursor: pointer;
  }
`;

const showForm = () => {
  $('#logInForm').slideToggle(100, 'linear');
};

const LogIn = props => {
  return (
    <Container>
      <FormBtn onClick={showForm}>Log in</FormBtn>
      <Form style={{ display: 'none' }} id='logInForm'>
        <div>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' required />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' required />
        </div>
        <div>
          <LogInBtn>Log in</LogInBtn>
        </div>
        <div>
          <LinkTxt href=''>Reset password</LinkTxt>
          <Link href='/create-account'>
            <LinkTxt>Create account</LinkTxt>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default LogIn;
