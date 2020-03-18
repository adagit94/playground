import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from '../../styled-components/buttons';

import { PropsButtons } from '../../../types/games/floating-point';
import {
  ContextGame,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Button = styled(ButtonOptions)`
  svg path {
    fill: #ff0000;
  }
`;

const RemovePlayer: React.FC<PropsButtons> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatches = useContext(ContextDispatches);

  const player = `P${states.players.indexOf(pos) + 1}`;

  return (
    <>
      <Button
        onClick={(): void => {
          dispatches.game({
            type: 'changePlayers',
            operation: 'remove',
            pos
          });

          dispatches.players({
            type: 'changePlayer',
            operation: 'remove',
            player
          });

          dispatches.params({
            type: 'changePlayer',
            operation: 'remove',
            player
          });
        }}
        type='button'
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='7 7 10 10'>
          <path d='M19 13H5v-2h14v2z' />
        </svg>
      </Button>
    </>
  );
};

export default React.memo(RemovePlayer);
