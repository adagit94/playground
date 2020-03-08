import React from 'react';
import styled from 'styled-components';

import Logo from './logo';
import Nav from './nav';
import ThemeButton from './theme-button';
import LogIn from './log-in';

import { ContainerRow } from '../../styled-components/containers';

const Container = styled(ContainerRow)`
  flex: initial;
  height: 75px;
  border-bottom: 1px solid;
`;

const Header: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Logo />
      <Nav />
      <ThemeButton />
      <LogIn />
    </Container>
  );
};

export default Header;
