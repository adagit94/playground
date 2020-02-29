import React from 'react';
import styled from 'styled-components';

import OptionsParameters from './options-parameters';
import Buttons from './buttons';

import { DividerHorizontalInvisible } from '../../styled-components/dividers';

const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
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
