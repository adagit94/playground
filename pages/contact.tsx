import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/layout';

const Container = styled.div`
  text-align: center;
`;

const Contact: React.FC = (): JSX.Element => {
  const content = (
    <Container>
      <h1>Contact</h1>
      <p>abc</p>
    </Container>
  );

  return <Layout content={content} />;
};

export default React.memo(Contact);
