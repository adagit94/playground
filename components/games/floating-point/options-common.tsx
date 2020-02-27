import React from 'react';
import styled from 'styled-components';

import OptionsParameters from './options-parameters';
import Buttons from './buttons';

const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`;

const DividerHorizontalInvisible = styled.div`
  height: 2px;
`;

const OptionsCommon: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Buttons />
      <DividerHorizontalInvisible />
      <OptionsParameters />
    </Container>
  );
};

export default React.memo(OptionsCommon);
