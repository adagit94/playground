import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Content from './Content';

const Container = styled.main`
  grid-area: pag;
  display: flex;
  flex-direction: row;
`;

const Page = props => {
  return (
    <Container>
      <Nav />
      <Content content={props.content} />
    </Container>
  );
};

export default Page;
