import styled, { keyframes, css } from 'styled-components';

import {
  GetKeyframe,
  RectangleShapeProps,
  CircleShapeProps
} from 'types/styled-components';

const getKeyframe: GetKeyframe = props => {
  const { animationName } = props.styles;

  let keyframe;

  if (animationName === 'translateVertical') {
    const { top, height } = props;

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

export const Rectangle = styled.div<RectangleShapeProps>`
  position: absolute;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ width }): number => width}%;
  height: ${({ height }): number => height}%;
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

export const Circle = styled.div<CircleShapeProps>`
  position: absolute;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  border-top: ${({ styles }): string => styles?.borderTop};
  border-right: ${({ styles }): string => styles?.borderRight};
  border-bottom: ${({ styles }): string => styles?.borderBottom};
  border-left: ${({ styles }): string => styles?.borderLeft};
  border-radius: 100%;
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
`;
