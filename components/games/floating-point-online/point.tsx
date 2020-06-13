import { useContext, memo } from 'react';
import styled, { keyframes, ThemeContext, Keyframes } from 'styled-components';

import { DEFAULTS } from 'defaults/games/floating-point-online';
import { Theming } from 'types/layout';
import { FPIconProps, AnimProps } from 'types/styled-components';
import { ContextFP } from 'contexts/games/floating-point-online';

const FPIcon = styled.div.attrs<FPIconProps>(({ top, left }) => ({
  style: {
    top: `${top}%`,
    left: `${left}%`
  }
}))<FPIconProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  border-radius: 100%;
`;

const Anim = styled.div<AnimProps>`
  border-radius: 100%;
  animation-name: ${({ animation }): Keyframes => animation};
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
`;

const Point: React.FC = (): JSX.Element => {
  const statesFP = useContext(ContextFP);
  const theming: Theming = useContext(ThemeContext);

  const { size } = DEFAULTS;
  const { top, left } = statesFP;

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

  return (
    <FPIcon top={top} left={left} size={size} className='fp'>
      <Anim animation={waving} />
    </FPIcon>
  );
};

export default memo(Point);
