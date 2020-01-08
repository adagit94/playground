import React from 'react';
import styled from 'styled-components';
import Header from './header/header';
import Page from './page/page';
import Footer from './footer/footer';

const Container = styled.div`
  border: 1px solid black;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 75px 1fr 75px;
  grid-template-areas:
    'hea'
    'pag'
    'foo';
`;

const Playground = props => {
  return (
    <Container>
      <Header />
      <Page content={props.content} />
      <Footer />
    </Container>
  );
};

export default Playground;
