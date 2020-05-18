import { useContext, memo } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';

import { DEFAULTS_GAME_FP } from '../../../defaults/games/floating-point-online';
import { Theming } from '../../../types/layout';
import { ContextFP } from '../../../contexts/games/floating-point-online';

const Point: React.FC = (): JSX.Element => {
  const statesFP = useContext(ContextFP);
  const theming: Theming = useContext(ThemeContext);

  const { top, left } = statesFP;

  const { dimensions } = DEFAULTS_GAME_FP;

  const Point = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${top}%;
    left: ${left}%;
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
    background-color: ${theming.inverted};
    }
`;

  const InnerCircle = styled.div`
    border-radius: 100%;
    animation-name: ${waving};
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-iteration-count: infinite;
  `;

  return (
    <Point>
      <InnerCircle />
    </Point>
  );
};

export default memo(Point);
