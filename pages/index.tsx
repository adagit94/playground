import React from 'react';
//import styled from 'styled-components';
import Layout from '../components/layout/layout';

const Index: React.FC = (): JSX.Element => {
  const content = <div>abc</div>;

  return <Layout content={content} />;
};

export default React.memo(Index);
