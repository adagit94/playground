import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import OptionsPlayer from './options-player';

import { ContextPlayers } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 45%;
  border-top: 1px solid;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const statesPlayers = useContext(ContextPlayers);
  const [initPossible, setInitPossible] = useState<boolean>(true);

  const players = Object.keys(statesPlayers);

  return (
    <Container>
      <OptionsPlayer
        player={players[0]}
        initPossible={initPossible}
        setInitPossible={setInitPossible}
        admin
      />
      <OptionsPlayer player={players[2]} initPossible={initPossible} />
      <OptionsPlayer player={players[3]} initPossible={initPossible} />
      <OptionsPlayer player={players[1]} initPossible={initPossible} />
    </Container>
  );
};

export default React.memo(ControlPanel);
