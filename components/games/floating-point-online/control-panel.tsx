import { useContext, memo, useReducer } from 'react';
import styled from 'styled-components';

import OptionsPlayer from './options-player';
import OptionsCommon from './options-common';

import { paddingContainer } from 'components/styled-components/_variables';

import { reducerControlPanel } from 'reducers/games/floating-point-online';
import { initControlPanel } from 'inits/games/floating-point-online';
import { ContextGame } from 'contexts/games/floating-point-online';
import { ContextPlayers } from 'contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 30%;
  padding: ${paddingContainer};
  border-top: 2px solid;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const [statesControlPanel, dispatchControlPanel] = useReducer(
    reducerControlPanel,
    initControlPanel
  );

  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { highlightUnready, highlightEnvOptions } = statesControlPanel;
  const { admin } = statesGame;

  const players = Object.keys(statesPlayers).filter(player => player !== admin);

  return (
    <Container>
      <OptionsPlayer
        player={admin}
        highlightUnready={highlightUnready}
        dispatchControlPanel={dispatchControlPanel}
      />
      <OptionsPlayer player={players[1]} highlightUnready={highlightUnready} />
      <OptionsCommon highlightEnvOptions={highlightEnvOptions} />
      <OptionsPlayer player={players[2]} highlightUnready={highlightUnready} />
      <OptionsPlayer player={players[0]} highlightUnready={highlightUnready} />
    </Container>
  );
};

export default memo(ControlPanel);
