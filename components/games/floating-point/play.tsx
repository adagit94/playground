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

  const state = statesGame.state;
  const players = statesGame.players;

  const handlePlay: React.FormEventHandler<HTMLButtonElement> = (): void => {
    const dimensions: number = statesParams.dimensions;
    const speed: number = statesParams.speed;
    let playable: boolean;

    players.forEach((_, index) => {
      const player = 'P' + index;
      console.log(statesParams[player]);
      const shape = statesParams[player].shape;

      if (shape === undefined) {
        dispatchParams({
          type: 'changeShape',
          operation: '',
          player,
          shape: null
        });
      }

      if (dimensions === undefined) {
        dispatchParams({
          type: 'changeDimensions',
          dimensions: null
        });
      }

      if (speed === undefined) {
        dispatchParams({
          type: 'changeSpeed',
          speed: null
        });
      }

      if (
        playable !== false &&
        (shape === undefined ||
          shape === null ||
          dimensions === undefined ||
          dimensions === null ||
          speed === undefined ||
          speed === null)
      ) {
        playable = false;
      }
    });

    if (playable === false) return;

    const height: number = statesGame.height[0];
    const width: number = statesGame.width[0];

    players.forEach((_, index) => {
      let top: number;
      let left: number;

      switch (index) {
        case 1:
          top = height / 2 - dimensions / 2;
          left = 10;
          break;
        case 2:
          top = height / 2 - dimensions / 2;
          left = width - dimensions - 10;
          break;
        case 3:
          top = 10;
          left = width / 2 - dimensions / 2;
          break;
        case 4:
          top = height - dimensions - 10;
          left = width / 2 - dimensions / 2;
          break;
      }

      dispatchPlayers({
        type: 'init',
        player: 'P' + index,
        top,
        left
      });
    });

    dispatchFP({
      type: 'move',
      top: Math.random() * height,
      left: Math.random() * width
    });

    dispatchGame({
      type: 'changeState',
      state: 'running'
    });
  };

  return (
    <Container>
      {state !== 'off' && (
        <Button
          onClick={
            state === 'conf'
              ? handlePlay
              : (): void =>
                  dispatchGame({
                    type: 'changeState',
                    state: state === 'running' ? 'paused' : 'running'
                  })
          }
          value={state !== 'running' && state !== 'recalc' ? 'Play' : 'Pause'}
          type='button'
        />
      )}
    </Container>
  );
};

export default React.memo(Play);