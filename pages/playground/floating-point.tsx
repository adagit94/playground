import dynamic from 'next/dynamic';

import Layout from '../../components/layout/layout';
const Controller = dynamic(
  () => import('../../components/games/floating-point/abc'),
  { ssr: false }
);

const FloatingPoint = (): JSX.Element => {
  const content = Controller;

  return <Layout content={'content'} />;
};

export default FloatingPoint;
