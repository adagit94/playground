import styled, { keyframes, css } from 'styled-components';

import { GetKeyframe, ShapeProps } from 'types/styled-components';

const getKeyframe: GetKeyframe = ({ styles }) => {
  const { animationName } = styles;

  let keyframe;

  if (animationName === 'translateVertical') {
    const { top, height } = styles;

    const to = top < 50 ? 50 - height : 50;

    keyframe = keyframes`
      0% {
        top: ${top}%;
      } 
  
      50% {
        top: ${to}%;
      }
  
      100% {
        top:${top}%;
      }
    `;
  } else if (animationName === 'rotate360') {
    keyframe = keyframes`
      0% {
        transform: rotate(0deg);
      } 
  
      100% {
        transform: rotate(360deg);   
      }
    `;
  }

  return css`
    ${keyframe}
  `;
};

export const Shape = styled.div<ShapeProps>`
  position: absolute;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ styles }): string =>
    styles.width + (styles?.borderRadius === '100%' ? 'px' : '%')};
  height: ${({ styles }): string =>
    styles.height + (styles?.borderRadius === '100%' ? 'px' : '%')};
  border-top: ${({ styles }): string => styles?.borderTop};
  border-right: ${({ styles }): string => styles?.borderRight};
  border-bottom: ${({ styles }): string => styles?.borderBottom};
  border-left: ${({ styles }): string => styles?.borderLeft};
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
  border-radius: ${({ styles }): string => styles?.borderRadius};
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
  animation-name: ${({ styles }): GetKeyframe =>
    styles?.animationName && getKeyframe};
  animation-duration: ${({ styles }): string => styles?.animationName && '2s'};
  animation-timing-function: ${({ styles }): string =>
    styles?.animationName && 'linear'};
  animation-iteration-count: ${({ styles }): string =>
    styles?.animationName && 'infinite'};
`;
