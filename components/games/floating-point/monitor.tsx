import React, { useReducer } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import { initFP, init } from '../../../inits/games/floating-point';
import { reducerFP } from '../../../reducers/games/floating-point';

const Monitor = ({ state }): JSX.Element => {
  const [statesFP, dispatchFP]: any = useReducer(reducerFP, initFP, init);

  const Container = styled.div`
    height: 70%;
    position: relative;
    visibility: ${state === 'running' || state === 'paused'
      ? 'visible'
      : 'hidden'};
  `;

  return (
    <Container id='monitor'>
      <Players statesFP={statesFP} dispatchFP={dispatchFP} />
      <Point statesFP={statesFP} />
    </Container>
  );
};

export default React.memo(Monitor);
