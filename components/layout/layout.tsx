import React from 'react';
import styled from 'styled-components';

import Header from './header/header';
import View from './view/view';
import Footer from './footer/footer';

import { ContextContent } from '../../contexts/layout/content';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 75px 1fr 25px;
  grid-template-areas:
    'header'
    'view'
    'footer';
    color: #ffffff;
    background-color: #000000;
`;

const Layout: React.FC<{ content: JSX.Element }> = ({
  content
}): JSX.Element => {
  return (
    <Container>
      <Header />
      <ContextContent.Provider value={content}>
        <View />
      </ContextContent.Provider>
      <Footer />
    </Container>
  );
};

export default React.memo(Layout);
