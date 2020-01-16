import React, { useContext } from 'react';
import styled from 'styled-components';

import Dimensions from './dimensions';
import Speed from './speed';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  margin: 10 0px;
  background-color: #000000;
`;

const OptionsParameters = (): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <Dimensions />
      <DividerHorizontal />
      <Speed />
      {(!states.isTurnedOn || states.isRunning) && <Disabled />}
    </Container>
  );
};

export default React.memo(OptionsParameters);
