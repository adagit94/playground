import { useContext, memo } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';

import { Theming } from 'types/layout';
import {
  ContextGame,
  ContextParams,
  ContextFP
} from 'contexts/games/floating-point-offline';

const Point: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);
  const theming: Theming = useContext(ThemeContext);

  const { state } = statesGame;
  const { size, speed } = statesParams;
  const { top, left } = statesFP;

  const Point = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 100%;
  `;

  const waving = keyframes`
    from {
      width: 0;
      height: 0;
      background-color: unset;    
    } 

    to {
    width: ${size}px;
    height: ${size}px;
    background-color: ${theming.inverted};
    }
`;

  const InnerCircle = styled.div`
    border-radius: 100%;
    animation-name: ${waving};
    animation-duration: ${2 - 2 * (speed / 10)}s;
    animation-timing-function: ease-in;
    animation-iteration-count: infinite;
    animation-play-state: ${state === 'paused' ? 'paused' : 'run'};
  `;

  return (
    <Point>
      <InnerCircle />
    </Point>
  );
};

export default memo(Point);
