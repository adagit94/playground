import React from 'react';

import {
  FormInput,
  FormButton,
  FormPage,
  FormContainer,
  FormRowPage
} from '../components/styled-components/forms';

const ResetPassword: React.FC = (): JSX.Element => {
  return (
    <FormContainer>
      <FormPage>
        <FormRowPage>
          <label htmlFor='email'>Email: </label>
          <FormInput type='email' name='email' id='email' required />
        </FormRowPage>
        <FormRowPage>
          <FormButton type='button'>Reset</FormButton>
        </FormRowPage>
      </FormPage>
    </FormContainer>
  );
};

export default ResetPassword;
