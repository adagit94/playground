import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';
import LogIn from './LogIn';

const Container = styled.header`
  grid-area: hea;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #000000;
`;

const Header = () => {
  return (
    <Container>
      <Logo />
      <Nav />
      <LogIn />
    </Container>
  );
};

export default Header;
