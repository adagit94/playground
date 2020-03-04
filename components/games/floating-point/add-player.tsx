import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonPlayer } from '../../styled-components/buttons';

import { PropsButtons } from '../../../types/games/floating-point';
import {
  ContextGame,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Button = styled(ButtonPlayer)`
  background-color: #32cd32;
`;

const AddPlayer: React.FC<PropsButtons> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatches = useContext(ContextDispatches);

  const player = states.players.length === 2 ? 'P3' : 'P4';

  return (
    <>
      <Button
        onClick={(): void => {
          dispatches.game({
            type: 'changePlayers',
            operation: 'add',
            pos
          });

          dispatches.players({
            type: 'changePlayer',
            operation: 'add',
            player
          });

          dispatches.params({
            type: 'changePlayer',
            operation: 'add',
            player
          });
        }}
        value='+'
        type='button'
      />
    </>
  );
};

export default React.memo(AddPlayer);
