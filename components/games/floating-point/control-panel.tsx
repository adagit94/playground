import React, { useContext } from 'react';
import styled from 'styled-components';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';
import {
  ContextGame,
  ContextDispatchGame,
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
  const dispatchParams = useContext(ContextDispatchParams);
  const playerLeft = states.players.includes('left');
  const playerRight = states.players.includes('right');

  return (
    <Container>
      <OptionsPlayer player='P1' />

      {playerLeft && (
        <OptionsPlayer player={states.players[2] === 'left' ? 'P3' : 'P4'} />
      )}

      {states.state === 'conf' && playerLeft ? (
        <RemovePlayer
          onClick={(): void => {
            dispatchGame({
              type: 'logPlayer',
              operation: 'remove',
              pos: 'left'
            });

            dispatchParams({
              type: 'changeShape',
              operation: 'remove',
              player: states.players.length === 3 ? 'P3' : 'P4'
            });
          }}
        >
          -
        </RemovePlayer>
      ) : states.state === 'conf' && !playerLeft ? (
        <AddPlayer
          onClick={(): void => {
            dispatchGame({
              type: 'logPlayer',
              operation: 'add',
              pos: 'left'
            });
          }}
        >
          +
        </AddPlayer>
      ) : null}

      <OptionsCommon />

      {playerRight && (
        <OptionsPlayer player={states.players[2] === 'right' ? 'P3' : 'P4'} />
      )}

      {states.state === 'conf' && playerRight ? (
        <RemovePlayer
          onClick={(): void => {
            dispatchGame({
              type: 'logPlayer',
              operation: 'remove',
              pos: 'right'
            });

            dispatchParams({
              type: 'changeShape',
              operation: 'remove',
              player: states.players.length === 3 ? 'P3' : 'P4'
            });
          }}
        >
          -
        </RemovePlayer>
      ) : states.state === 'conf' && !playerRight ? (
        <AddPlayer
          onClick={(): void => {
            dispatchGame({
              type: 'logPlayer',
              operation: 'add',
              pos: 'right'
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
