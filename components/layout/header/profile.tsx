import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { PropsProfile } from '../../../types/layout';

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

const Button = styled.button`
  padding: 5px;
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

const Profile: React.FC<PropsProfile> = ({ clientID, name, logout }) => {
  const router = useRouter();

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
        <Button
          onClick={(): void =>
            logout({ returnTo: `http://localhost:3000${router.pathname}` })
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
