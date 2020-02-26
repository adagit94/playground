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
  height: 30%;
  padding: 10px;
  border: 5px solid;
  border-radius: 250px 250px 0 0;
`;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40%;
`;

const AddPlayer = styled.input`
  position: relative;
  width: 50px;
  height: 50px;
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

const RemovePlayer = styled.input`
  width: 50px;
  height: 50px;
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
      <Side>
        <OptionsPlayer player='P1' />

        {playerLeft && <OptionsPlayer player={PL} />}
      </Side>

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
          value='-'
          type='button'
        />
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
          value='+'
          type='button'
        />
      ) : null}

      <OptionsCommon />

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
          value='-'
          type='button'
        />
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
          value='+'
          type='button'
        />
      ) : null}
      <Side>
        {playerRight && <OptionsPlayer player={PR} />}

        <OptionsPlayer player='P2' />
      </Side>
    </Container>
  );
};

export default React.memo(ControlPanel);
