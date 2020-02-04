import React, { useContext } from 'react';
import styled from 'styled-components';

import Shape from './shape';
import Color from './color';

import { ContextGame } from '../../../contexts/games/floating-point';

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
`;

const Params = styled.div`
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const ParamsDisabled = styled.div`
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

const RemovePlayer = styled.button`
  width: 50px;
  height: 50px;
`;

const OptionsPlayer: React.FC<{ player: string }> = ({
  player
}): JSX.Element => {
  const states = useContext(ContextGame);

  const Container = styled.div`
    width: ${player === 'P3' || player === 'P4' ? '275px' : '225px'};
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

  return (
    <Container>
      <Heading>
        <h3>{player}</h3>
      </Heading>
      <Options>
        <Params>
          <Shape player={player} />
          <DividerVertical />
          <Color player={player} />
          {(states.state === 'off' ||
            states.state === 'running' ||
            states.state === 'paused') && <ParamsDisabled />}
        </Params>
        {(player === 'P3' || player === 'P4') && <RemovePlayer>-</RemovePlayer>}
      </Options>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
