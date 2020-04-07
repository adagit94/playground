import React from 'react';

import {
  FormInput,
  FormButton,
  FormPage,
  FormContainerPage,
  FormRowPage
} from '../components/styled-components/forms';

const ResetPassword: React.FC = (): JSX.Element => {
  return (
    <FormContainerPage>
      <FormPage>
        <FormRowPage>
          <label htmlFor='email'>Email: </label>
          <FormInput type='email' name='email' id='email' required />
        </FormRowPage>
        <FormRowPage>
          <FormButton type='button'>Reset</FormButton>
        </FormRowPage>
      </FormPage>
    </FormContainerPage>
  );
};

export default ResetPassword;
