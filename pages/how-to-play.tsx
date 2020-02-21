import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/layout';

const Container = styled.div`
  text-align: center;
`;

const HowToPlay: React.FC = (): JSX.Element => {
  const content = (
    <Container>
      <h1>How To Play</h1>
      <p>abc</p>
    </Container>
  );

  return <Layout content={content} />;
};

export default React.memo(HowToPlay);
