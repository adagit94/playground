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
  background-color: #008000;
  font-size: 2rem;
  cursor: pointer;
`;

const RemovePlayer = styled.button`
  width: 50px;
  height: 50px;
  border: none;
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
  const playerLeft = players.includes('left');
  const playerRight = players.includes('right');
  const P3 = players[2];
  const PL = playerLeft && (P3 === 'left' ? 'P3' : 'P4');
  const PR = playerRight && (P3 === 'right' ? 'P3' : 'P4');
  const P_ = players.length === 2 ? 'P3' : 'P4';

  return (
    <Container>
      <OptionsPlayer player='P1' />

      {playerLeft && <OptionsPlayer player={PL} />}

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
              player: PL
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'remove',
              player: PL
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
              player: P_
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'add',
              player: P_
            });
          }}
        >
          +
        </AddPlayer>
      ) : null}

      <OptionsCommon />

      {playerRight && <OptionsPlayer player={PR} />}

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
              player: PR
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'remove',
              player: PR
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
              player: P_
            });

            dispatchParams({
              type: 'changePlayer',
              operation: 'add',
              player: P_
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
