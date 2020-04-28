import React, { useContext } from 'react';
import styled from 'styled-components';

import OptionsPlayer from './options-player';

import { ContextPlayers } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 45%;
  border-top: 1px solid;
`;

const ControlPanel: React.FC = () => {
  const statesPlayers = useContext(ContextPlayers);

  const players = Object.keys(statesPlayers);

  return (
    <Container>
      <OptionsPlayer player={players[0]} />
      <OptionsPlayer player={players[2]} />
      <OptionsPlayer player={players[3]} />
      <OptionsPlayer player={players[1]} />
    </Container>
  );
};

export default React.memo(ControlPanel);
