import React, { useContext } from 'react';
import styled from 'styled-components';

import Dimensions from './dimensions';
import Speed from './speed';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 2 2 0;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
`;

const Disabled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #00000080;
`;

const DividerHorizontal = styled.div`
  height: 2px;
  margin: 10px 0;
  background-color: #000000;
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
