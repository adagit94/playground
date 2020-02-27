import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Button = styled.input`
  width: 50px;
  height: 100%;
  border: none;
  font-size: 2rem;
  border-radius: 5px;
  color: #ffffff;
  background-color: #32cd32;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

const AddPlayer: React.FC<{ pos: string }> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);

  const player = states.players.length === 2 ? 'P3' : 'P4';

  return (
    <>
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
    </>
  );
};

export default React.memo(AddPlayer);
