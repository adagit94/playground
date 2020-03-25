import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { ContextAuth0 } from '../../../contexts/auth0';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
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

const Button = styled.button`
  padding: 10px;
  font-weight: bold;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
    border-right-color: ${(props): string => props.theme.inverted};
    border-left-color: ${(props): string => props.theme.inverted};
    color: ${(props): string => props.theme.inverted};
    background-color: ${(props): string => props.theme.background};
  }

  &:focus {
    outline: none;
  }
`;

const Profile: React.FC = (): JSX.Element => {
  const auth0 = useContext(ContextAuth0);
  const router = useRouter();

  const statesAuth0 = auth0.statesAuth0;

  const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-image: url(${!statesAuth0.loading && statesAuth0.user.picture});
  `;

  return (
    <Container>
      <Row>
        <Avatar />
      </Row>
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
        <Button
          onClick={(): void =>
            auth0.logout({
              returnTo: `http://localhost:3000${router.pathname}`,
              // eslint-disable-next-line @typescript-eslint/camelcase
              client_id: auth0.clientID
            })
          }
          type='button'
        >
          Log out
        </Button>
      </Row>
    </Container>
  );
};

export default Profile;
