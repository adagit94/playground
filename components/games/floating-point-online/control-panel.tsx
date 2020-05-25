import { useContext, useState, memo } from 'react';
import styled from 'styled-components';

import OptionsPlayer from './options-player';
import OptionsCommon from './options-common';

import { paddingContainer } from 'components/styled-components/_variables';

import { ContextGame } from 'contexts/games/floating-point-online';
import { ContextPlayers } from 'contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 40%;
  padding: ${paddingContainer};
  border-top: 1px solid;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const [initPossible, setInitPossible] = useState(true);

  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

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
      <OptionsCommon />
      <OptionsPlayer player={players[2]} initPossible={initPossible} />
      <OptionsPlayer player={players[0]} initPossible={initPossible} />
    </Container>
  );
};

export default memo(ControlPanel);
