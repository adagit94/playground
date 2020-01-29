import React from 'react';
import styled from 'styled-components';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30%;
  padding: 10px;
`;

const ControlPanel = (): JSX.Element => {
  return (
    <Container>
      <OptionsPlayer player='P1' />
      <OptionsPlayer player='P3' />
      <OptionsCommon />
      <OptionsPlayer player='P4' />
      <OptionsPlayer player='P2' />
    </Container>
  );
};

export default React.memo(ControlPanel);
