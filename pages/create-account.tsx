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
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  input {
    &[type='text'],
    &[type='email'],
    &[type='password'] {
      border: 2px solid #000000;
      border-radius: 5px;
      transition-property: box-shadow;
      transition-duration: 0.1s;
      transition-timing-function: linear;

      :focus {
        outline: none;
        box-shadow: 0 0 0 2px #000000;
      }
    }
  }
`;

const SubmitBtn = styled.input`
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

  :hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
    border-right-color: #ffffff;
    border-left-color: #ffffff;
  }

  :focus {
    outline: none;
  }
`;

const CreateAccount: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Form>
        <Row>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' required />
        </Row>
        <Row>
          <label htmlFor='email'>Email: </label>
          <input type='email' name='email' id='email' required />
        </Row>
        <Row>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' required />
        </Row>
        <Row>
          <label htmlFor='password-confirm'>Password: </label>
          <input
            type='password'
            name='password-confirm'
            id='password-confirm'
            required
          />
        </Row>
        <Row>
          <SubmitBtn value='Create account' type='button' />
        </Row>
      </Form>
    </Container>
  );
};

export default React.memo(CreateAccount);
