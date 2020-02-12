import React, { useContext } from 'react';
import styled from 'styled-components';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';
import {
  ContextGame,
  ContextDispatchGame,
  ContextDispatchPlayers,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30%;
  padding: 10px;
`;

const AddPlayer = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border: none;
  color: #ffffff;
  background-color: #008000;
  font-size: 2rem;
  cursor: pointer;
`;

const RemovePlayer = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  color: #ffffff;
  background-color: #ff0000;
  font-size: 2rem;
  cursor: pointer;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchPlayers = useContext(ContextDispatchPlayers);
  const dispatchParams = useContext(ContextDispatchParams);

  const state = states.state;
  const players = states.players;
  const playersCount = players.length;
  const playerLeft = states.players.includes('left');
  const playerRight = states.players.includes('right');

  return (
    <Container>
      <OptionsPlayer player='P1' />

      {playerLeft && (
        <OptionsPlayer player={players[2] === 'left' ? 'P3' : 'P4'} />
      )}

      {state === 'conf' && playerLeft ? (
        <RemovePlayer
          onClick={(): void => {
            dispatchGame({
              type: 'changePlayers',
              operation: 'remove',
              pos: 'left'
            });

            dispatchPlayers({
              type: 'changePlayer',
              operation: 'remove',
              player: playersCount === 3 ? 'P3' : 'P4'
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'remove',
              player: playersCount === 3 ? 'P3' : 'P4'
            });
          }}
        >
          -
        </RemovePlayer>
      ) : state === 'conf' && !playerLeft ? (
        <AddPlayer
          onClick={(): void => {
            dispatchGame({
              type: 'changePlayers',
              operation: 'add',
              pos: 'left'
            });

            dispatchPlayers({
              type: 'changePlayer',
              operation: 'add',
              player: playersCount === 2 ? 'P3' : 'P4'
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'add',
              player: playersCount === 2 ? 'P3' : 'P4'
            });
          }}
        >
          +
        </AddPlayer>
      ) : null}

      <OptionsCommon />

      {playerRight && (
        <OptionsPlayer player={players[2] === 'right' ? 'P3' : 'P4'} />
      )}

      {state === 'conf' && playerRight ? (
        <RemovePlayer
          onClick={(): void => {
            dispatchGame({
              type: 'changePlayers',
              operation: 'remove',
              pos: 'right'
            });

            dispatchPlayers({
              type: 'changePlayer',
              operation: 'remove',
              player: playersCount === 3 ? 'P3' : 'P4'
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'remove',
              player: playersCount === 3 ? 'P3' : 'P4'
            });
          }}
        >
          -
        </RemovePlayer>
      ) : state === 'conf' && !playerRight ? (
        <AddPlayer
          onClick={(): void => {
            dispatchGame({
              type: 'changePlayers',
              operation: 'add',
              pos: 'right'
            });

            dispatchPlayers({
              type: 'changePlayer',
              operation: 'add',
              player: playersCount === 2 ? 'P3' : 'P4'
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'add',
              player: playersCount === 2 ? 'P3' : 'P4'
            });
          }}
        >
          +
        </AddPlayer>
      ) : null}

      <OptionsPlayer player='P2' />
    </Container>
  );
};

export default React.memo(ControlPanel);
