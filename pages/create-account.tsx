import React from 'react';
import styled from 'styled-components';

import { FormStandard } from '../components/styled-components/forms';
import { ButtonSubmit } from '../components/styled-components/buttons';
import { InputForm } from '../components/styled-components/inputs';
import {
  ContainerRowCenter,
  ContainerColumnAround
} from '../components/styled-components/containers';

const Container = styled(ContainerRowCenter)`
  height: 100%;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const Row = styled(ContainerColumnAround)`
  height: 75px;
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
      <FormStandard>
        <Row>
          <label htmlFor='username'>Username: </label>
          <InputForm type='text' name='username' id='username' required />
        </Row>
        <Row>
          <label htmlFor='email'>Email: </label>
          <InputForm type='email' name='email' id='email' required />
        </Row>
        <Row>
          <label htmlFor='password'>Password: </label>
          <InputForm type='password' name='password' id='password' required />
        </Row>
        <Row>
          <label htmlFor='password-confirm'>Confirm password: </label>
          <InputForm
            type='password'
            name='password-confirm'
            id='password-confirm'
            required
          />
        </Row>
        <Row>
          <Button value='Create account' type='button' />
        </Row>
      </FormStandard>
    </Container>
  );
};

export default CreateAccount;
