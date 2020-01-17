import React from 'react';
import styled from 'styled-components';
import Nav from './nav';
import Main from './main';

const Container = styled.section`
  grid-area: pag;
  display: flex;
  flex-direction: row;
`;

const View = (): JSX.Element => {
  return (
    <Container>
      <Nav />
      <Main />
    </Container>
  );
};

export default View;
