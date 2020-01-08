import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/layout';

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <Container>
      <Layout />
    </Container>
  );
};

export default App;
