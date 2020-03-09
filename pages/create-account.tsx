import React from 'react';
import styled from 'styled-components';

import { FormPage } from '../components/styled-components/forms';
import { ButtonSubmit } from '../components/styled-components/buttons';
import { InputForm } from '../components/styled-components/inputs';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: ${(props): string => props.theme.background};
`;

const Input = styled(InputForm)`
  color: ${(props): string => props.theme.background};
  border-color: ${(props): string => props.theme.background};
`;

const Button = styled(ButtonSubmit)`
  background-color: ${(props): string => props.theme.inverted};

  &:hover {
    border-right-color: ${(props): string => props.theme.inverted};
    border-left-color: ${(props): string => props.theme.inverted};
    color: ${(props): string => props.theme.inverted};
    background-color: ${(props): string => props.theme.background};
  }
`;

const CreateAccount: React.FC = (): JSX.Element => {
  return (
    <Container>
      <FormPage>
        <Row>
          <label htmlFor='username'>Username: </label>
          <Input type='text' name='username' id='username' required />
        </Row>
        <Row>
          <label htmlFor='email'>Email: </label>
          <Input type='email' name='email' id='email' required />
        </Row>
        <Row>
          <label htmlFor='password'>Password: </label>
          <Input type='password' name='password' id='password' required />
        </Row>
        <Row>
          <label htmlFor='password-confirm'>Confirm password: </label>
          <Input
            type='password'
            name='password-confirm'
            id='password-confirm'
            required
          />
        </Row>
        <Row>
          <Button value='Create account' type='button' />
        </Row>
      </FormPage>
    </Container>
  );
};

export default CreateAccount;
