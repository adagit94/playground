import React from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

const Container = styled.div`
  height: 70%;
  position: relative;
`;

const Monitor = (): JSX.Element => {
  return (
    <Container id='monitor'>
      <Players />
      <Point />
    </Container>
  );
};

export default React.memo(Monitor);
