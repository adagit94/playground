import React from 'react';
import styled from 'styled-components';

import Switch from './switch';
import Play from './play';
import Reset from './reset';

const Container = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
`;

const Buttons: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Play />
      <Switch />
      <Reset />
    </Container>
  );
};

export default React.memo(Buttons);
