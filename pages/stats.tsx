import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Container = styled.div`
  text-align: center;
`;

const Stats = () => {
  const content = (
    <Container>
      <h1>Stats</h1>
      <p>abc</p>
    </Container>
  );

  return <Layout content={content} />;
};

export default Stats;
