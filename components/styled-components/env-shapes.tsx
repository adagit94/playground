import styled, { keyframes, css } from 'styled-components';

import { GetKeyframe } from 'types/styled-components';

const getKeyframe: GetKeyframe = props => {
  const name = props.styles.animationName;
  const from = props.top;
  const to = props.top < 50 ? 50 - props.height : 50;
  const direction = 'top';

  let keyframe;

  switch (name) {
    case 'sliding':
      keyframe = keyframes`
      0% {
        ${direction}: ${from}%;
      } 
  
      50% {
        ${direction}: ${to}%;
      }
  
      100% {
        ${direction}: ${from}%;    
      }
    `;

      break;
  }

  return css`
    ${keyframe}
  `;
};

export const Rectangle = styled.div`
  position: absolute;
  top: ${(props): number => props.top}%;
  left: ${(props): number => props.left}%;
  width: ${(props): number => props.width}%;
  height: ${(props): number => props.height}%;
  border-top: ${(props): number => props.styles?.borderTop};
  border-right: ${(props): number => props.styles?.borderRight};
  border-bottom: ${(props): number => props.styles?.borderBottom};
  border-left: ${(props): number => props.styles?.borderLeft};
  background-color: ${(props): string =>
    props.styles?.backgroundColor || props.theme.inverted};
  border-radius: ${(props): number => props.styles?.borderRadius};
  background-color: ${(props): string =>
    props.styles?.backgroundColor || props.theme.inverted};
  animation-name: ${(props): Function =>
    props.styles?.animationName && getKeyframe};
  animation-duration: ${(props): string => props.styles?.animationName && '2s'};
  animation-timing-function: ${(props): string =>
    props.styles?.animationName && 'linear'};
  animation-iteration-count: ${(props): string =>
    props.styles?.animationName && 'infinite'};
`;

export const Circle = styled.div`
  position: absolute;
  top: ${(props): number => props.top}%;
  left: ${(props): number => props.left}%;
  width: ${(props): number => props.size}px;
  height: ${(props): number => props.size}px;
  border-top: ${(props): number => props.styles?.borderTop};
  border-right: ${(props): number => props.styles?.borderRight};
  border-bottom: ${(props): number => props.styles?.borderBottom};
  border-left: ${(props): number => props.styles?.borderLeft};
  border-radius: 100%;
  background-color: ${(props): string =>
    props.styles?.backgroundColor || props.theme.inverted};
`;
