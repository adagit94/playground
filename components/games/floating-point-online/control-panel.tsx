import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import OptionsPlayer from './options-player';

import { ContextGame } from '../../../contexts/games/floating-point-online';
import { ContextPlayers } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 30%;
  border-top: 1px solid;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const [initPossible, setInitPossible] = useState<boolean>(true);

  const { admin } = statesGame;

  const players = Object.keys(statesPlayers).filter(player => player !== admin);

  return (
    <Container>
      <OptionsPlayer
        player={admin}
        initPossible={initPossible}
        setInitPossible={setInitPossible}
      />
      <OptionsPlayer player={players[1]} initPossible={initPossible} />
      <OptionsPlayer player={players[2]} initPossible={initPossible} />
      <OptionsPlayer player={players[0]} initPossible={initPossible} />
    </Container>
  );
};

export default React.memo(ControlPanel);
