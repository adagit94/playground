import React, { useContext } from 'react';
import styled from 'styled-components';

import Shape from './shape';
import Color from './color';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  width: 200px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  flex: 4 4 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Options = styled.div`
  padding: 10px;
  position: relative;
  flex: 6 6 0;
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

const DividerVerticalInvisible = styled.div`
  width: 2px;
  display: inline-block;
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
        <DividerVerticalInvisible />
        <Color id={id} />
        {(!states.isTurnedOn || states.isRunning) && <OptionsDisabled />}
      </Options>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
