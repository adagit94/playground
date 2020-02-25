import React, { useContext } from 'react';
import styled from 'styled-components';

import Shape from './shape';
import Color from './color';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled.div`
  width: 50%;
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
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px;
`;

const OptionsDisabled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  background-color: #ffffff80;
`;

const DividerVertical = styled.div`
  width: 2px;
  margin: 0 10px;
  display: inline-block;
  background-color: #ffffff;
`;

const OptionsPlayer: React.FC<{ player: string }> = ({
  player
}): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <Heading>
        <h3>{player}</h3>
      </Heading>
      <Options>
        <Shape player={player} />
        <DividerVertical />
        <Color player={player} />
        {states.state !== 'conf' && <OptionsDisabled />}
      </Options>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
