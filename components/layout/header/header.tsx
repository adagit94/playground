import React from 'react';
import styled from 'styled-components';
import Logo from './logo';
import Nav from './nav';
import LogIn from './log-in';

const Container = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #000000;
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
