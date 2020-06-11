import styled, { keyframes, css, Keyframes } from 'styled-components';

import { GetKeyframe } from 'types/styled-components';

export const getKeyframe: GetKeyframe = ({ top, left, styles }) => {
  const { width, height, transform, animationName } = styles;

  let keyframe: Keyframes;
  let from: string | number;
  let to: string | number;

  switch (animationName) {
    case 'translateToCenterVertical':
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

    case 'translateCenterUp':
      keyframe = keyframes`
      0% {
        transform: ${transform} translateY(-70px);
      } 

      50% {
        transform: ${transform} translateY(-100px);
      } 
  
      100% {
        transform: ${transform} translateY(-70px);
      }
    `;

      break;

    case 'translateCenterRight':
      keyframe = keyframes`
      0% {
        transform: ${transform} translateY(-70px);
      } 

      50% {
        transform: ${transform} translateY(-100px);
      } 
  
      100% {
        transform: ${transform} translateY(-70px);
      }
    `;

      break;

    case 'translateCenterBottom':
      keyframe = keyframes`
      0% {
        transform: translateY(-70px);
      } 

      50% {
        transform: translateY(-100px);
      } 
  
      100% {
        transform: translateY(-70px);
      }
    `;

      break;

    case 'translateCenterLeft':
      keyframe = keyframes`
      0% {
        transform: ${transform} translateY(-70px);
      } 

      50% {
        transform: ${transform} translateY(-100px);
      } 
  
      100% {
        transform: ${transform} translateY(-70px);
      }
    `;

      break;
  }

  return css`
    ${keyframe}
  `;
};
