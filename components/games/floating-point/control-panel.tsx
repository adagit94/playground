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
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);
  const dispatch = useContext(ContextDispatchGame);

  return (
    <Container>
      <OptionsPlayer player='P1' />
      {states.players > 2 ? (
        <OptionsPlayer player='P3' />
      ) : (
        <AddPlayer
          onClick={(): void =>
            dispatch({ type: 'changePlayers', operation: 'add' })
          }
        >
          +
        </AddPlayer>
      )}
      <OptionsCommon />
      {states.players > 3 ? (
        <OptionsPlayer player='P4' />
      ) : (
        <AddPlayer
          onClick={(): void =>
            dispatch({ type: 'changePlayers', operation: 'add' })
          }
        >
          +
        </AddPlayer>
      )}
      <OptionsPlayer player='P2' />
    </Container>
  );
};

export default React.memo(ControlPanel);
