import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../components/layout/layout';

import { ContainerRowBetweenWrap } from '../components/styled-components/containers';

const Container = styled(ContainerRowBetweenWrap)`
  border: 1px solid red;
`;

const Item = styled.div`
  border: 1px solid;
  width: 100px;
  height: 100px;
`;

const Playground: React.FC = (): JSX.Element => {
  const content = (
    <Container>
      <Item>
        <Link href='/playground/floating-point'>
          <a>Floating Point</a>
        </Link>
      </Item>
    </Container>
  );

  return <Layout content={content} />;
};

export default React.memo(Playground);
