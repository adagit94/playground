import React, { useContext } from 'react';
import styled from 'styled-components';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';
import {
  ContextGame,
  ContextDispatchGame
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
  width: 50px;
  height: 50px;
  border: none;
  color: #ffffff;
  background-color: #008000;
  font-size: 2rem;
`;

const RemovePlayer = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  color: #ffffff;
  background-color: #ff0000;
  font-size: 2rem;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatch = useContext(ContextDispatchGame);
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
          onClick={(): void =>
            dispatch({
              type: 'logPlayer',
              operation: 'remove',
              pos: 'left'
            })
          }
        >
          -
        </RemovePlayer>
      ) : (states.state === 'conf' || states.state === 'off') && !playerLeft ? (
        <AddPlayer
          onClick={(): void =>
            dispatch({
              type: 'logPlayer',
              operation: 'add',
              pos: 'left'
            })
          }
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
          onClick={(): void =>
            dispatch({
              type: 'logPlayer',
              operation: 'remove',
              pos: 'right'
            })
          }
        >
          -
        </RemovePlayer>
      ) : (states.state === 'conf' || states.state === 'off') &&
        !playerRight ? (
        <AddPlayer
          onClick={(): void =>
            dispatch({
              type: 'logPlayer',
              operation: 'add',
              pos: 'right'
            })
          }
        >
          +
        </AddPlayer>
      ) : null}

      <OptionsPlayer player='P2' />
    </Container>
  );
};

export default React.memo(ControlPanel);
