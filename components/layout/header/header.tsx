import React from 'react';
import styled from 'styled-components';
import Logo from './logo';
import Nav from './nav';
import LogIn from './log-in';

const Container = styled.header`
  height: 75px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
`;

const Header: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Logo />
      <Nav />
      <LogIn />
    </Container>
  );
};

export default React.memo(Header);
