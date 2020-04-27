import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from '../../styled-components/buttons';

import {
  ContextGame,
  ContextParams,
  ContextDispatchesFP
} from '../../../contexts/games/floating-point-offline';

const Button = styled(ButtonOptions)`
  margin-right: 10px;

  svg path {
    fill: ${(props): string => props.theme.inverted};
  }
`;

const Play: React.FC = () => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

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
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='5 3 15 15'>
            <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='6 4.5 13 14.5'>
            <path d='M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z' />
          </svg>
        )}
      </Button>
    </>
  );
};

export default React.memo(Play);
