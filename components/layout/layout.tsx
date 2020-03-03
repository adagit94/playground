import React from 'react';
import styled from 'styled-components';

import Header from './header/header';
import Main from './main';

import { ContainerColumn } from '../styled-components/containers';

import { PropsLayout } from '../../types/games/floating-point';

const Container = styled(ContainerColumn)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #ffffff;
  background-color: #000000;

  * {
    box-sizing: border-box;
  }
`;

const Layout: React.FC<PropsLayout> = ({ content }): JSX.Element => {
  return (
    <Container>
      <Header />
      <Main content={content} />
    </Container>
  );
};

export default React.memo(Layout);
