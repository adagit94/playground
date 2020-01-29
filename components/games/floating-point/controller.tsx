import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import {
  reducerGame,
  reducerParams
} from '../../../reducers/games/floating-point';

import {
  initGame,
  initParams,
  init
} from '../../../inits/games/floating-point';

import * as Contexts from '../../../contexts/games/floating-point';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DividerHorizontal = styled.div`
  height: 2px;
  margin: 10 0px;
  background-color: #000000;
`;

const Controller = (): JSX.Element => {
  const [statesGame, dispatchGame]: any = useReducer(
    reducerGame,
    initGame,
    init
  );

  const [statesParams, dispatchParams]: any = useReducer(
    reducerParams,
    initParams,
    init
  );

  useEffect(() => {
    dispatchGame({
      type: 'calculateDimensions',
      width: document.querySelector('#monitor').clientWidth,
      height: document.querySelector('#monitor').clientHeight
    });
  }, []);

  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextParams.Provider value={statesParams}>
          <Contexts.ContextDispatchGame.Provider value={dispatchGame}>
            <Contexts.ContextDispatchParams.Provider value={dispatchParams}>
              <Monitor state={statesGame.state} />
              <DividerHorizontal />
              <ControlPanel />
            </Contexts.ContextDispatchParams.Provider>
          </Contexts.ContextDispatchGame.Provider>
        </Contexts.ContextParams.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default React.memo(Controller);
