import React, { useEffect } from 'react';
import styled from 'styled-components';

import Logo from './logo';
import Nav from './nav';
import ThemeButton from './theme-button';
import Account from './account';

const Container = styled.header`
  flex: none;
  display: flex;
  flex-direction: row;
  height: 75px;
  border-bottom: 1px solid;
`;


const Header: React.FC = () => {
  useEffect(() => {
    console.log('mounted');
  
    return (): void => console.log('unmounted');
  }, []);
  return (
    <Container>
      <Logo />
      <Nav />
      <ThemeButton />
      <Account />
    </Container>
  );
};

export default Header;
