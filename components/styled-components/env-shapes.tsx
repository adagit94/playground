import styled, { keyframes, css, Keyframes } from 'styled-components';

import { GetKeyframe, ShapeProps } from 'types/styled-components';

const getKeyframe: GetKeyframe = ({ top, left, styles }) => {
  const { animationName, height, width } = styles;

  let keyframe: Keyframes;
  let from: string | number;
  let to: string | number;

  switch (animationName) {
    case 'translateVertical':
      to = top < 50 ? 50 - height : 50;

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

      break;

    case 'rotate360':
      keyframe = keyframes`
        0% {
          transform: rotate(0deg);
        } 
    
        100% {
          transform: rotate(360deg);   
        }
      `;

      break;
  }

  return css`
    ${keyframe}
  `;
};

export const Rectangle = styled.div<ShapeProps>`
  position: absolute;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ styles }): number => styles.width}%;
  height: ${({ styles }): number => styles.height}%;
  border-top: ${({ styles }): string => styles?.borderTop};
  border-right: ${({ styles }): string => styles?.borderRight};
  border-bottom: ${({ styles }): string => styles?.borderBottom};
  border-left: ${({ styles }): string => styles?.borderLeft};
  border-radius: ${({ styles }): string => styles?.borderRadius};
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
  animation-name: ${({ styles }): GetKeyframe =>
    styles?.animationName && getKeyframe};
  animation-duration: ${({ styles }): string => styles?.animationName && '5s'};
  animation-timing-function: ${({ styles }): string =>
    styles?.animationName && 'linear'};
  animation-iteration-count: ${({ styles }): string =>
    styles?.animationName && 'infinite'};
`;

export const Circle = styled.div<ShapeProps>`
  position: absolute;
  border-radius: 100%;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ styles }): number => styles.width}px;
  height: ${({ styles }): number => styles.height}px;
  border-top: ${({ styles }): string => styles?.borderTop};
  border-right: ${({ styles }): string => styles?.borderRight};
  border-bottom: ${({ styles }): string => styles?.borderBottom};
  border-left: ${({ styles }): string => styles?.borderLeft};
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
  animation-name: ${({ styles }): GetKeyframe =>
    styles?.animationName && getKeyframe};
  animation-duration: ${({ styles }): string => styles?.animationName && '5s'};
  animation-timing-function: ${({ styles }): string =>
    styles?.animationName && 'linear'};
  animation-iteration-count: ${({ styles }): string =>
    styles?.animationName && 'infinite'};
`;
