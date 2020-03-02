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
  background-color: #ff0000;
`;

const RemovePlayer: React.FC<PropsButtons> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);

  const player = `P${states.players.indexOf(pos) + 1}`;

  return (
    <ContainerButton>
      <Button
        onClick={(): void => {
          dispatchGame({
            type: 'changePlayers',
            operation: 'remove',
            pos
          });

          dispatchPlayers({
            type: 'changePlayer',
            operation: 'remove',
            player
          });

          dispatchParams({
            type: 'changePlayer',
            operation: 'remove',
            player
          });
        }}
        value='-'
        type='button'
      />
    </ContainerButton>
  );
};

export default React.memo(RemovePlayer);
