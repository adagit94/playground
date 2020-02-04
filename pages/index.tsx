import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/layout';

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
`;

const Index: React.FC = (): JSX.Element => {
  return <Container>{/*<Layout content='' />*/}</Container>;
};

export default React.memo(Index);
