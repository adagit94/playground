import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextGame,
  ContextParams,
  ContextDispatchGame,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.input`
  border: none;
  width: 80px;
  height: 50px;
`;

const Play = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatchGame = useContext(ContextDispatchGame);
  const dispatchParams = useContext(ContextDispatchParams);

  const handlePlay = (): void => {
    let playable: boolean;

    for (let i = 1; i <= statesGame.players; i++) {
      if (statesParams['P' + i].shape === '') {
        dispatchParams({
          type: 'changeShape',
          operation: '',
          player: ['P' + i],
          shape: undefined
        });
      }
      if (
        (statesParams['P' + i].shape === '' ||
          statesParams['P' + i].shape === undefined) &&
        playable !== false
      ) {
        playable = false;
      }
    }

    if (playable === false) return;

    dispatchGame({
      type: 'changeState',
      state: 'init'
    });
  };

  return (
    <Container>
      <Button
        onClick={
          statesGame.state === 'conf'
            ? handlePlay
            : (): void =>
                dispatchGame({
                  type: 'changeState',
                  state: statesGame.state === 'running' ? 'paused' : 'running'
                })
        }
        value={statesGame.state !== 'running' ? 'Play' : 'Pause'}
        type='button'
      />
    </Container>
  );
};

export default React.memo(Play);
