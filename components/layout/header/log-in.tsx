import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ButtonStandard } from '../../styled-components/buttons';
import { InputForm } from '../../styled-components/inputs';
import { LinkStandard } from '../../styled-components/links';

import { ContextFunctionsAuth0 } from '../../../contexts/auth0';

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const LogIn: React.FC = (): JSX.Element => {
  const functionsAuth0 = useContext(ContextFunctionsAuth0);

  return (
    <Form>
      <Row>
        <label htmlFor='username'>Username: </label>
        <InputForm type='text' name='username' id='username' required />
      </Row>
      <Row>
        <label htmlFor='password'>Password: </label>
        <InputForm type='password' name='password' id='password' required />
      </Row>
      <Row>
        <ButtonStandard
          onClick={functionsAuth0.loginWithRedirect}
          type='button'
        >
          Log in
        </ButtonStandard>
      </Row>
      <Row>
        <Link href='/reset-password' passHref>
          <LinkStandard>Reset password</LinkStandard>
        </Link>
        <Link href='/create-account' passHref>
          <LinkStandard>Create account</LinkStandard>
        </Link>
      </Row>
    </Form>
  );
};

export default LogIn;
