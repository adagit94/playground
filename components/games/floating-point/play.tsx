import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from '../../styled-components/buttons';

import {
  ContextGame,
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Button = styled(ButtonOptions)`
  margin-right: 10px;

  svg path {
    fill: ${(props): string => props.theme.inverted};
    width: auto;
    height: auto;
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
      const icon = statesParams[player].icon;

      if (icon === undefined) {
        dispatches.params({
          type: 'handleIcon',
          operation: 'nullify',
          player
        });
      }

      if (playable !== false && (icon === undefined || icon === null)) {
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
        type='button'
      >
        {state === 'running' ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 25 25'>
            <path d='M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z' />
          </svg>
        ) : (
          <svg
            style={{ borderRadius: '100%', border: '1px solid red' }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='4 4 16 16'
          >
            <path d='M10 16.5l6-4.5-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
          </svg>
        )}
      </Button>
    </>
  );
};

export default React.memo(Play);
