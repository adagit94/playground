import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextParams,
  ContextGlobals,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchFP,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.input`
  border: none;
  width: 80px;
  height: 50px;
`;

const Play = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const globals = useContext(ContextGlobals);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);
  const dispatchFP = useContext(ContextDispatchFP);

  const handlePlay = (): void => {
    let playable: boolean;

    for (let i = 1; i <= statesGame.players; i++) {
      if (statesParams['P' + i].shape === '') {
        dispatchParams({
          type: 'changeShape',
          operation: '',
          player: ['P' + i],
          shape: undefined
        });
      }
      if (
        (statesParams['P' + i].shape === '' ||
          statesParams['P' + i].shape === undefined) &&
        playable !== false
      ) {
        playable = false;
      }
    }

    if (playable === false) return;

    const topP1P2: number =
      globals.monitor.height / 2 - statesGame.dimensions / 2;
    const leftP3P4: number =
      globals.monitor.width / 2 - statesGame.dimensions / 2;
    const leftP2: number = globals.monitor.width - statesGame.dimensions;
    const topP4: number = globals.monitor.height - statesGame.dimensions;

    console.log(globals);

    dispatchGame({
      type: 'init'
    });

    dispatchPlayers({
      type: 'init',
      topP1P2,
      leftP3P4,
      leftP2,
      topP4
    });

    dispatchFP({
      type: 'move',
      top: globals.fp.top, // Math.random() * monitorWidth
      left: globals.fp.left // Math.random() * monitorHeight
    });
  };

  return (
    <Container>
      <Button
        onClick={
          !statesGame.isRunning
            ? handlePlay
            : (): void => dispatchGame({ type: 'changePause' })
        }
        value={!statesGame.isRunning || statesGame.isPaused ? 'Play' : 'Pause'}
        type='button'
      />
    </Container>
  );
};

export default React.memo(Play);
