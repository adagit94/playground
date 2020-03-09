import React, { useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';

import { Colors } from '../../../types/layout';
import {
  ContextGame,
  ContextParams,
  ContextFP
} from '../../../contexts/games/floating-point';

const Point: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);
  const colors: Colors = useContext(ThemeContext);

  const state = statesGame.state;
  const { dimensions, speed } = statesParams;
  const { top, left } = statesFP;

  const Point = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
    border-radius: 100%;
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
    background-color: ${colors.inverted};
    }
`;

  const InnerCircle = styled.div`
    border-radius: 100%;
    animation-name: ${waving};
    animation-duration: ${2 - 2 * (speed / 10)}s;
    animation-timing-function: ease-in;
    animation-iteration-count: infinite;
    animation-play-state: ${state === 'paused' ? 'paused' : 'running'};
  `;

  return (
    <Point>
      <InnerCircle />
    </Point>
  );
};

export default React.memo(Point);
