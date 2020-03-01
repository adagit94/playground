import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

import { PropsButtons } from '../../../types/games/floating-point';

const Container = styled.div`
border: 1px solid red;

  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.input`
  width: 35px;
  height: 35px;
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

const AddPlayer: React.FC<PropsButtons> = ({ pos }): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);

  const player = states.players.length === 2 ? 'P3' : 'P4';

  return (
    <Container>
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
    </Container>
  );
};

export default React.memo(AddPlayer);
