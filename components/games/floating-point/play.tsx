import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextParams,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchParams,
  ContextDispatchFP
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.input`
  border: none;
  width: 80px;
  height: 50px;
  cursor: pointer;
`;

const Play: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);
  const dispatchFP = useContext(ContextDispatchFP);

  const handlePlay: React.FormEventHandler<HTMLButtonElement> = (): void => {
    let playable: boolean;

    for (let i = 1; i <= statesGame.players.length; i++) {
      if (statesParams['P' + i].shape === undefined) {
        dispatchParams({
          type: 'changeShape',
          operation: '',
          player: 'P' + i,
          shape: null
        });
      }

      if (
        playable !== false &&
        (statesParams['P' + i].shape === undefined ||
          statesParams['P' + i].shape === null)
      ) {
        playable = false;
      }
    }

    if (statesParams.dimensions === undefined) {
      dispatchParams({
        type: 'changeDimensions',
        dimensions: null
      });
    }

    if (statesParams.speed === undefined) {
      dispatchParams({
        type: 'changeSpeed',
        speed: null
      });
    }

    if (
      playable !== false &&
      (statesParams.dimensions === undefined ||
        statesParams.dimensions === null ||
        statesParams.speed === undefined ||
        statesParams.speed === null)
    ) {
      playable = false;
    }

    if (playable === false) return;

    const topP1P2: number =
      statesGame.height[0] / 2 - statesParams.dimensions / 2;
    const leftP3P4: number =
      statesGame.width[0] / 2 - statesParams.dimensions / 2;
    const leftP2: number = statesGame.width[0] - statesParams.dimensions;
    const topP4: number = statesGame.height[0] - statesParams.dimensions;

    dispatchGame({
      type: 'changeState',
      state: 'running'
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
      top: Math.random() * statesGame.height[0],
      left: Math.random() * statesGame.width[0]
    });
  };

  return (
    <Container>
      {statesGame.state !== 'off' && (
        <Button
          onClick={
            statesGame.state === 'conf'
              ? handlePlay
              : (): void =>
                  dispatchGame({
                    type: 'changeState',
                    state: statesGame.state === 'running' ? 'paused' : 'running'
                  })
          }
          value={
            statesGame.state !== 'running' && statesGame.state !== 'recalc'
              ? 'Play'
              : 'Pause'
          }
          type='button'
        />
      )}
    </Container>
  );
};

export default React.memo(Play);
