import React from 'react';
import styled from 'styled-components';

import Players from './players';
import FloatingPoint from './floating-point';

const Container = styled.div`
  height: 80%;
  position: relative;
`;

function Monitor(): JSX.Element {
  return (
    <Container id='monitor'>
      <Players />
      <FloatingPoint />
    </Container>
  );
}

export default React.memo(Monitor);
