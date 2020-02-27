import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import {
  ContextGame,
  ContextParams,
  ContextFP
} from '../../../contexts/games/floating-point';

const Point: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);

  const dimensions = statesParams.dimensions;

  const Point = styled.div`
    border-radius: 100%;
    width: ${dimensions}px;
    height: ${dimensions}px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: ${statesFP.top}px;
    left: ${statesFP.left}px;
  `;

  const waving = keyframes`
    from {
      width: 0;
      height: 0;
      background-color: unset;    
    } 

    to {
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: #ffffff;
    }
`;

  const InnerCircle = styled.div`
    border-radius: 100%;
    animation-name: ${waving};
    animation-duration: ${2 - 2 * (statesParams.speed / 10)}s;
    animation-timing-function: ease-in;
    animation-iteration-count: infinite;
    animation-play-state: ${statesGame.state === 'paused'
      ? 'paused'
      : 'running'};
  `;

  return (
    <Point>
      <InnerCircle />
    </Point>
  );
};

export default React.memo(Point);
