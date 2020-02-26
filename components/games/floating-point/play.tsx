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
  width: 100%;
  height: 100%;
  border-top: transparent;
  border-right: 2px solid;
  border-bottom: transparent;
  border-left: 2px solid;
  border-radius: 5px;
  color: #ffffff;
  background-color: unset;
  transition-property: color, background-color, border-right-color,
    border-left-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  :hover {
    color: #000000;
    background-color: #ffffff;
    border-right-color: #000000;
    border-left-color: #000000;
  }
`;

const Play: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);
  const dispatchFP = useContext(ContextDispatchFP);

  const state = statesGame.state;

  const handlePlay: React.FormEventHandler<HTMLButtonElement> = (): void => {
    const playersCount = statesGame.players.length;
    const dimensions: number = statesParams.dimensions;
    const speed: number = statesParams.speed;
    let playable: boolean;

    for (let i = 1; i <= playersCount; i++) {
      const player = 'P' + i;

      const shape = statesParams[player].shape;

      if (shape === undefined) {
        dispatchParams({
          type: 'changeShape',
          operation: '',
          player,
          shape: null
        });
      }

      if (playable !== false && (shape === undefined || shape === null)) {
        playable = false;
      }
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
      (dimensions === undefined ||
        dimensions === null ||
        speed === undefined ||
        speed === null)
    ) {
      playable = false;
    }

    if (playable === false) return;

    const height: number = statesGame.height[0];
    const width: number = statesGame.width[0];

    for (let i = 1; i <= playersCount; i++) {
      const player = 'P' + i;
      let top: number;
      let left: number;

      switch (player) {
        case 'P1':
          top = height / 2 - dimensions / 2;
          left = 10;
          break;
        case 'P2':
          top = height / 2 - dimensions / 2;
          left = width - dimensions - 10;
          break;
        case 'P3':
          top = 10;
          left = width / 2 - dimensions / 2;
          break;
        case 'P4':
          top = height - dimensions - 10;
          left = width / 2 - dimensions / 2;
          break;
      }

      dispatchPlayers({
        type: 'init',
        player,
        top,
        left
      });
    }

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
