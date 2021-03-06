import { useContext, memo } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from 'components/styled-components/buttons';

import {
  ContextGame,
  ContextParams,
  ContextDispatchesFP
} from 'contexts/games/floating-point-offline';

const Button = styled(ButtonOptions)`
  margin-right: 10px;

  svg path {
    fill: ${(props): string => props.theme.inverted};
  }
`;

const Play: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const { state } = statesGame;

  const handlePlay: React.FormEventHandler<HTMLButtonElement> = (): void => {
    const playersCount = statesGame.players.length;
    const { size, speed } = statesParams;

    let playable;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;
      const { icon } = statesParams[player];

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

    if (size === undefined) {
      dispatches.params({
        type: 'changeDimensions',
        size: null
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
      (size === undefined ||
        size === null ||
        speed === undefined ||
        speed === null)
    ) {
      playable = false;
    }

    if (playable === false) return;

    const { height, width } = statesGame;

    for (let i = 1; i <= playersCount; i++) {
      const player = `P${i}`;
      let top;
      let left;

      switch (player) {
        case 'P1':
          top = height / 2 - size / 2;
          left = 10;
          break;

        case 'P2':
          top = height / 2 - size / 2;
          left = width - size - 10;
          break;

        case 'P3':
          top = 10;
          left = width / 2 - size / 2;
          break;

        case 'P4':
          top = height - size - 10;
          left = width / 2 - size / 2;
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
      top: height / 2 - size / 2,
      left: width / 2 - size / 2
    });

    dispatches.game({
      type: 'changeState',
      state: 'run'
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
                  state: state === 'run' ? 'paused' : 'run'
                })
        }
        type='button'
      >
        {state === 'run' && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='5 3 15 15'>
            <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
          </svg>
        )}

        {state !== 'run' && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='6 4.5 13 14.5'>
            <path d='M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z' />
          </svg>
        )}
      </Button>
    </>
  );
};

export default memo(Play);
