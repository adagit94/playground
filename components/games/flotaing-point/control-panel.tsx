import React from 'react';
import styled from 'styled-components';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
`;

function ControlPanel(): JSX.Element {
  return (
    <Container>
      <OptionsPlayer id='P1' />
      <OptionsPlayer id='P3' />
      <OptionsCommon />
      <OptionsPlayer id='P4' />
      <OptionsPlayer id='P2' />
    </Container>
  );
}

export default React.memo(ControlPanel);
