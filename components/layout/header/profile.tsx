/* eslint-disable @typescript-eslint/camelcase */

import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { FormButton } from '../../styled-components/forms';

import { logout } from '../../../firebase/auth';
import { ContextDispatchesLayout } from '../../../contexts/layout';
import { ContextFirebase } from '../../../contexts/firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  color: ${(props): string => props.theme.background};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${(props): string => props.theme.background};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Profile: React.FC = (): JSX.Element => {
  const statesFirebase = useContext(ContextFirebase);

  const { user } = statesFirebase;

  const name = user.displayName || user.email;

  return (
    <Container>
      <Row>{name}</Row>
      <Row>
        <Link href='/stats'>
          <a>Stats</a>
        </Link>
      </Row>
      <Row>
        <Link href='/settings'>
          <a>Settings</a>
        </Link>
      </Row>
      <Row>
        <FormButton
          onClick={(): void => {
            logout();
          }}
          type='button'
        >
          Log out
        </FormButton>
      </Row>
    </Container>
  );
};

export default React.memo(Profile);
