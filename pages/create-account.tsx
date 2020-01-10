import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Form = styled.form`
  width: 200px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    input {
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

const SubmitBtn = styled.button`
  width: 110px;
  border-top: none;
  border-bottom: none;
  border-left: 2px solid #000000;
  border-right: 2px solid #000000;
  border-radius: 5px;
  color: #000000;
  background-color: #ffffff;
  padding: 5px;
  transition-property: color, background-color, border-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    color: #ffffff;
    background-color: #000000;
    border-color: #ffffff;
    cursor: pointer;
  }
`;

const CreateAccount = props => {
  return (
    <Container>
      <Form>
        <Square>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' required />
        </Square>
        <Square>
          <label htmlFor='email'>Email: </label>
          <input type='email' name='email' id='email' required />
        </Square>
        <Square>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' required />
        </Square>
        <Square>
          <label htmlFor='confirmPassword'>Password: </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            required
          />
        </Square>
        <Square>
          <SubmitBtn>Create account</SubmitBtn>
        </Square>
      </Form>
    </Container>
  );
};

export default CreateAccount;
