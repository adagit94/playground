import React, { useContext, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { LinkStandard } from '../../styled-components/links';
import { DividerHorizontal } from '../../styled-components/dividers';
import {
  FormInput,
  FormButton,
  FormSocialProvider
} from '../../styled-components/forms';

import { loginEmail, loginProvider } from '../../../firebase/auth';
import { ContextDispatchesLayout } from '../../../contexts/layout';

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: ${(props): string => props.theme.background};
`;

const Label = styled.label`
  width: 75px;
`;

const SocialProviderFb = styled(FormSocialProvider)`
  background-color: #3b5897;

  &:hover {
    background-color: #334d84;
  }
`;

const SocialProviderGoogle = styled(FormSocialProvider)`
  background-color: #c93e22;

  &:hover {
    background-color: #b3371e;
  }
`;

const Divider = styled(DividerHorizontal)`
  background-color: ${(props): string => props.theme.background};
`;

const LogIn: React.FC = (): JSX.Element => {
  const dispatches = useContext(ContextDispatchesLayout);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initUser = (user): void => {
    dispatches.firebase({ type: 'setUser', payload: user });
  };

  return (
    <Form
      onSubmit={(e): void => {
        e.preventDefault();

        loginEmail(email, password, initUser);
      }}
    >
      <FormRow>
        <SocialProviderFb
          onClick={(): void => {
            loginProvider('fb', initUser);
          }}
          type='button'
        >
          <img src='/icons/fb.svg' alt='facebook icon' />
          Log in with Facebook
        </SocialProviderFb>
      </FormRow>
      <FormRow>
        <SocialProviderGoogle
          onClick={(): void => {
            loginProvider('google', initUser);
          }}
          type='button'
        >
          <img src='/icons/google.svg' alt='google icon' />
          Log in with Google
        </SocialProviderGoogle>
      </FormRow>
      <Divider />
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
        <FormButton type='submit'>Log in</FormButton>
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

export default React.memo(LogIn);
