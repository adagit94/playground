import React, { useContext } from 'react';
import styled from 'styled-components';

import Dimensions from './dimensions';
import Speed from './speed';

import { DividerHorizontal } from '../../styled-components/dividers';
import { Disabled } from '../../styled-components/overlaps';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
`;

const OptionsParameters: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <Dimensions />
      <DividerHorizontal />
      <Speed />
      {states.state !== 'conf' && <Disabled />}
    </Container>
  );
};

export default React.memo(OptionsParameters);
