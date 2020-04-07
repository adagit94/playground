import React, { useContext, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { LinkStandard } from '../../styled-components/links';
import { FormInput, FormButton, FormRow } from '../../styled-components/forms';

import { loginEmail } from '../../../firebase/auth';

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Label = styled.label`
  width: 75px;
`;

const LogIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  console.log(email);
  console.log(password);

  return (
    <Form
      onSubmit={(): void => {
        loginEmail(email, password);
      }}
    >
      <FormRow>
        <Label htmlFor='email'>Email: </Label>
        <FormInput
          onChange={(e): void => {
            setEmail(e.target.value);
          }}
          type='email'
          name='email'
          id='email'
          required
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='password'>Password: </Label>
        <FormInput
          onChange={(e): void => {
            setPassword(e.target.value);
          }}
          type='password'
          name='password'
          id='password'
          required
        />
      </FormRow>
      <FormRow>
        <FormButton onClick={loginEmail} type='submit'>
          Log in
        </FormButton>
      </FormRow>
      <FormRow>
        <Link href='/reset-password' passHref>
          <LinkStandard>Reset password</LinkStandard>
        </Link>
        <Link href='/create-account' passHref>
          <LinkStandard>Create account</LinkStandard>
        </Link>
      </FormRow>
    </Form>
  );
};

export default LogIn;
