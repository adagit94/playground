/* eslint-disable @typescript-eslint/camelcase */

import { useContext, memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { FormButton } from 'components/styled-components/forms';

import { logout } from '../../../firebase/auth';
import { ContextFirebase } from 'contexts/firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  color: ${({ theme }): string => theme.background};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${({ theme }): string => theme.background};

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
        <Link href='/stats/[uid]' as={`/stats/${user.uid}`}>
          <a>Stats</a>
        </Link>
      </Row>
      <Row>
        <Link href='/settings/[uid]' as={`/settings/${user.uid}`}>
          <a>Settings</a>
        </Link>
      </Row>
      <Row>
        <FormButton onClick={logout} type='button'>
          Log out
        </FormButton>
      </Row>
    </Container>
  );
};

export default memo(Profile);
