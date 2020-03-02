import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContainerButton } from '../../styled-components/containers';
import { ButtonPlayer } from '../../styled-components/buttons';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

import { PropsButtons } from '../../../types/games/floating-point';

const Button = styled(ButtonPlayer)`
  background-color: #32cd32;
`;

const AddPlayer: React.FC<PropsButtons> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);

  const player = states.players.length === 2 ? 'P3' : 'P4';

  return (
    <ContainerButton>
      <Button
        onClick={(): void => {
          dispatchGame({
            type: 'changePlayers',
            operation: 'add',
            pos
          });

          dispatchPlayers({
            type: 'changePlayer',
            operation: 'add',
            player
          });

          dispatchParams({
            type: 'changePlayer',
            operation: 'add',
            player
          });
        }}
        value='+'
        type='button'
      />
    </ContainerButton>
  );
};

export default React.memo(AddPlayer);
