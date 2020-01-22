import React, { useContext } from 'react';
import styled from 'styled-components';

import Shape from './shape';
import Color from './color';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  width: 225px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Options = styled.div`
  flex: auto;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const OptionsDisabled = styled.div`
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

const OptionsPlayer = ({ id }): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <Heading>
        <h3>{id}</h3>
      </Heading>
      <Options>
        <Shape id={id} />
        <DividerVertical />
        <Color id={id} />
        {(!states.isTurnedOn || states.isRunning) && <OptionsDisabled />}
      </Options>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
