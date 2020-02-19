import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import Monitor from './monitor';
import ControlPanel from './control-panel';

import * as Reducers from '../../../reducers/games/floating-point';
import * as Inits from '../../../inits/games/floating-point';
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

const Controller: React.FC = (): JSX.Element => {
  const [statesGame, dispatchGame] = useReducer(
    Reducers.reducerGame,
    Inits.initGame,
    Inits.init
  );

  const [statesPlayers, dispatchPlayers] = useReducer(
    Reducers.reducerPlayers,
    Inits.initPlayers,
    Inits.init
  );

  const [statesParams, dispatchParams] = useReducer(
    Reducers.reducerParams,
    Inits.initParams,
    Inits.init
  );

  const [statesFP, dispatchFP] = useReducer(
    Reducers.reducerFP,
    Inits.initFP,
    Inits.init
  );

  useEffect(() => {
    const calculateDimensions = (): void => {
      dispatchGame({
        type: 'calculateDimensions',
        width: document.querySelector('#monitor').clientWidth,
        height: document.querySelector('#monitor').clientHeight
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return (): void => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);
  //console.log(statesGame.state);
  return (
    <Container>
      <Contexts.ContextGame.Provider value={statesGame}>
        <Contexts.ContextPlayers.Provider value={statesPlayers}>
          <Contexts.ContextParams.Provider value={statesParams}>
            <Contexts.ContextFP.Provider value={statesFP}>
              <Contexts.ContextDispatchGame.Provider value={dispatchGame}>
                <Contexts.ContextDispatchPlayers.Provider
                  value={dispatchPlayers}
                >
                  <Contexts.ContextDispatchParams.Provider
                    value={dispatchParams}
                  >
                    <Contexts.ContextDispatchFP.Provider value={dispatchFP}>
                      <Monitor />

                      <DividerHorizontal />
                      <ControlPanel />
                    </Contexts.ContextDispatchFP.Provider>
                  </Contexts.ContextDispatchParams.Provider>
                </Contexts.ContextDispatchPlayers.Provider>
              </Contexts.ContextDispatchGame.Provider>
            </Contexts.ContextFP.Provider>
          </Contexts.ContextParams.Provider>
        </Contexts.ContextPlayers.Provider>
      </Contexts.ContextGame.Provider>
    </Container>
  );
};

export default React.memo(Controller);
