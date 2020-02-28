import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

import { PropsButtons } from '../../../types/games/floating-point';

const Button = styled.input`
  width: 50px;
  height: 100%;
  border: none;
  font-size: 2rem;
  border-radius: 5px;
  color: #ffffff;
  background-color: #ff0000;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

const RemovePlayer: React.FC<PropsButtons> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);

  const player = `P${states.players.indexOf(pos) + 1}`;

  return (
    <>
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
    </>
  );
};

export default React.memo(RemovePlayer);
