import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from '../../styled-components/buttons';

import { PropsButtons } from '../../../types/games/floating-point';
import {
  ContextGame,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const Button = styled(ButtonOptions)`
  background-image: url('/icons/remove.svg');
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
      />
    </>
  );
};

export default React.memo(RemovePlayer);
