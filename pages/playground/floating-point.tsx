import React from 'react';
import Layout from '../../components/layout/layout';
import Controller from '../../components/games/floating-point/controller';

const FloatingPoint: React.FC = (): JSX.Element => {
  const content = <Controller />;

  return <Layout content={content} />;
};

export default React.memo(FloatingPoint);
