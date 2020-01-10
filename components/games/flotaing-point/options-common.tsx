import React from 'react';
import styled from 'styled-components';

import Switch from './switch';
import OptionsParameters from './options-parameters';
import Buttons from './buttons';

const Container = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const DividerHorizontalInvisible = styled.div`
  height: 2px;
`;

function OptionsCommon(): JSX.Element {
  return (
    <Container>
      <Switch />
      <DividerHorizontalInvisible />
      <OptionsParameters />
      <DividerHorizontalInvisible />
      <Buttons />
    </Container>
  );
}

export default React.memo(OptionsCommon);
