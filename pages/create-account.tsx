import React from 'react';
import styled from 'styled-components';

import { FormStandard } from '../components/styled-components/forms';
import { ButtonSubmit } from '../components/styled-components/buttons';
import { InputForm } from '../components/styled-components/inputs';
import {
  ContainerRowCenter,
  ContainerColumnAround
} from '../components/styled-components/containers';

const Row = styled(ContainerColumnAround)`
  height: 75px;
`;

const CreateAccount: React.FC = (): JSX.Element => {
  return (
    <ContainerRowCenter>
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
          <ButtonSubmit value='Create account' type='button' />
        </Row>
      </FormStandard>
    </ContainerRowCenter>
  );
};

export default CreateAccount;
