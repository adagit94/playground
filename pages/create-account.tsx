import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  FormInput,
  FormButton,
  FormPage,
  FormContainerPage,
  FormRowPage
} from '../components/styled-components/forms';

import { createUser, validator } from '../firebase/auth';

const ValidationWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 150px;
  width: 100px;
  height: 100px;
  border: 2px solid;
  border-radius: 5px;
`;

const CreateAccount: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { count, upper, num, special } = validator(password);

  /*  useEffect(() => {
    if (
      isValid === false &&
      count === true &&
      upper === true &&
      num === true &&
      special === true
    ) {
      setIsValid(true);
    }
  });
  */

  return (
    <FormContainerPage>
      <ValidationWindow>
        Password must contain at least:
        <ul>
          <li>8 characters</li>
          <li>One uppercase letter</li>
          <li>One number</li>
          <li>One special character</li>
        </ul>
      </ValidationWindow>
      <FormPage
        onSubmit={(e): void => {
          e.preventDefault();
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
