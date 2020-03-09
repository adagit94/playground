import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonState } from '../../styled-components/buttons';

import {
  ContextGame,
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Button = styled(ButtonState)`
  margin-right: 10px;
  color: ${(props): string => props.theme.inverted};

  &:hover {
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
    border-right-color: ${(props): string => props.theme.inverted};
    border-left-color: ${(props): string => props.theme.inverted};
  }
`;

const Play: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatches = useContext(ContextDispatches);

  const state = statesGame.state;

  const handlePlay: React.FormEventHandler<HTMLInputElement> = (): void => {
    const playersCount = statesGame.players.length;
    const { dimensions, speed } = statesParams;
    let playable: boolean;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;
      const shape = statesParams[player].shape;

      if (shape === undefined) {
        dispatches.params({
          type: 'handleShape',
          operation: 'nullify',
          player
        });
      }

      if (playable !== false && (shape === undefined || shape === null)) {
        playable = false;
      }
    }

    if (dimensions === undefined) {
      dispatches.params({
        type: 'changeDimensions',
        dimensions: null
      });
    }

    if (speed === undefined) {
      dispatches.params({
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

    const height = statesGame.height;
    const width = statesGame.width;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;
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

      dispatches.players({
        type: 'init',
        player,
        top,
        left
      });
    }

    dispatches.fp({
      type: 'move',
      top: height / 2 - dimensions / 2,
      left: width / 2 - dimensions / 2
    });

    dispatches.game({
      type: 'changeState',
      state: 'running'
    });
  };

  return (
    <>
      <Button
        onClick={
          state === 'conf'
            ? handlePlay
            : (): void =>
                dispatches.game({
                  type: 'changeState',
                  state: state === 'running' ? 'paused' : 'running'
                })
        }
        value={state === 'running' ? 'Pause' : 'Play'}
        type='button'
      />
    </>
  );
};

export default React.memo(Play);
