import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ButtonStandard } from '../../styled-components/buttons';
import { LinkStandard } from '../../styled-components/links';

import {
  ContextStatesAuth0,
  ContextFunctionsAuth0
} from '../../../contexts/auth0';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Profile: React.FC = (): JSX.Element => {
  const statesAuth0 = useContext(ContextStatesAuth0);
  const functionsAuth0 = useContext(ContextFunctionsAuth0);

  const user = statesAuth0.user;

  const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-image: url(${!statesAuth0.loading ? user.picture : 'none'});
  `;

  return (
    <Container>
      <Row>
        <Avatar />
      </Row>
      <Row>
        <Link href='/stats' passHref>
          <LinkStandard>Stats</LinkStandard>
        </Link>
      </Row>
      <Row>
        <Link href='/settings' passHref>
          <LinkStandard>Settings</LinkStandard>
        </Link>
      </Row>
      <Row>
        <ButtonStandard onClick={functionsAuth0.logout} type='button'>
          Log out
        </ButtonStandard>
      </Row>
    </Container>
  );
};

export default Profile;
