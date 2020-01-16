import React from 'react';
import styled from 'styled-components';
import Nav from './nav';
import Content from './content';

const Container = styled.main`
  grid-area: pag;
  display: flex;
  flex-direction: row;
`;

const Main = (): JSX.Element => {
  return (
    <Container>
      <Nav />
      <Content />
    </Container>
  );
};

export default Main;
