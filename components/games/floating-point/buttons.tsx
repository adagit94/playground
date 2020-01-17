import React, { useContext } from 'react';
import styled from 'styled-components';

import Play from './play';
import Button from './reset';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 2.5 2.5 0;
  display: flex;
  flex-direction: row;
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

const DividerVertical = styled.div`
  width: 2px;
  margin: 0 10px;
  display: inline-block;
  background-color: #000000;
`;

const Buttons = (): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <Play />
      <DividerVertical />
      <Button />
      {!states.isTurnedOn && <Disabled />}
    </Container>
  );
};

export default React.memo(Buttons);
