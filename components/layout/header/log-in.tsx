import { useContext, useState, memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { paddingButton } from 'components/styled-components/_variables';
import { LinkStandard } from 'components/styled-components/links';
import { DividerHorizontal } from 'components/styled-components/dividers';
import {
  FormInput,
  FormButton,
  FormSocialProvider,
  FormRowHorizontal,
  FormLabel
} from 'components/styled-components/forms';

import { loginEmail, loginProvider } from '../../../firebase/auth';
import { ContextDispatchesLayout } from 'contexts/layout';
import { HandleLoading } from 'types/firebase';

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: ${paddingButton};
`;

const SocialProviderFb = styled(FormSocialProvider)`
  background-color: #3b5897;

  &:hover {
    background-color: #334d84;
    cursor: not-allowed;
  }
`;

const SocialProviderGoogle = styled(FormSocialProvider)`
  background-color: #c93e22;

  &:hover {
    background-color: #b3371e;
  }
`;

const LogIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatches = useContext(ContextDispatchesLayout);

  const handleLoading: HandleLoading = value => {
    dispatches.firebase({ type: 'setLoading', value });
  };

  return (
    <Form
      onSubmit={(e): void => {
        e.preventDefault();

        loginEmail(email, password, handleLoading);
      }}
    >
      <FormRowHorizontal>
        <SocialProviderFb
          onClick={(): void => {
            loginProvider('fb', handleLoading);
          }}
          type='button'
          disabled
        >
          <img src='/icons/fb.svg' alt='facebook icon' />
          Log in with Facebook
        </SocialProviderFb>
      </FormRowHorizontal>
      <FormRowHorizontal>
        <SocialProviderGoogle
          onClick={(): void => {
            loginProvider('google', handleLoading);
          }}
          type='button'
        >
          <img src='/icons/google.svg' alt='google icon' />
          Log in with Google
        </SocialProviderGoogle>
      </FormRowHorizontal>
      <DividerHorizontal color='background' />
      <FormRowHorizontal>
        <FormLabel htmlFor='email'>Email: </FormLabel>
        <FormInput
          onChange={(e): void => {
            setEmail(e.target.value);
          }}
          value={email}
          type='email'
          name='email'
          id='email'
          required
        />
      </FormRowHorizontal>
      <FormRowHorizontal>
        <FormLabel htmlFor='password'>Password: </FormLabel>
        <FormInput
          onChange={(e): void => {
            setPassword(e.target.value);
          }}
          value={password}
          type='password'
          name='password'
          id='password'
          required
        />
      </FormRowHorizontal>
      <FormRowHorizontal>
        <FormButton type='submit'>Log in</FormButton>
      </FormRowHorizontal>
      <FormRowHorizontal>
        <Link href='/reset-password' passHref>
          <LinkStandard>Reset password</LinkStandard>
        </Link>
        <Link href='/create-account' passHref>
          <LinkStandard>Create account</LinkStandard>
        </Link>
      </FormRowHorizontal>
    </Form>
  );
};

export default memo(LogIn);
