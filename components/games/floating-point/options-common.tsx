import React from 'react';
import styled from 'styled-components';

import Switch from './switch';
import OptionsParameters from './options-parameters';
import Buttons from './buttons';

const Container = styled.div`
  width: 225px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DividerHorizontalInvisible = styled.div`
  height: 2px;
`;

const OptionsCommon = (): JSX.Element => {
  return (
    <Container>
      <Switch />
      <DividerHorizontalInvisible />
      <OptionsParameters />
      <DividerHorizontalInvisible />
      <Buttons />
    </Container>
  );
};

export default React.memo(OptionsCommon);
