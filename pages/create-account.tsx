import React, { useState } from 'react';

import {
  FormInput,
  FormButton,
  FormPage,
  FormContainerPage,
  FormRowPage
} from '../components/styled-components/forms';

import { createUser } from '../firebase/auth';

const CreateAccount: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <FormContainerPage>
      <FormPage
        onSubmit={(): void => {
          createUser(email, password);
        }}
      >
        <FormRowPage>
          <label htmlFor='email'>Email: </label>
          <FormInput
            onChange={(e): void => {
              setEmail(e.target.value);
            }}
            type='email'
            name='email'
            id='email'
            required
          />
        </FormRowPage>
        <FormRowPage>
          <label htmlFor='password'>Password: </label>
          <FormInput
            onChange={(e): void => {
              setPassword(e.target.value);
            }}
            type='password'
            name='password'
            id='password'
            required
          />
        </FormRowPage>
        <FormRowPage>
          <label htmlFor='password-confirm'>Confirm password: </label>
          <FormInput
            type='password'
            name='password-confirm'
            id='password-confirm'
            required
          />
        </FormRowPage>
        <FormRowPage>
          <FormButton type='submit'>Create account</FormButton>
        </FormRowPage>
      </FormPage>
    </FormContainerPage>
  );
};

export default CreateAccount;
