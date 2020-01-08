import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

const Container = styled.div`
  text-align: center;
`;

const Playground = () => {
  const content = (
    <Container>
      <h1>Playground</h1>
      <p>abc</p>
    </Container>
  );

  return <Layout content={content} />;
};

export default Playground;
