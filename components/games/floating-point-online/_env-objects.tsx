import styled from 'styled-components';

import { getKeyframe } from 'helpers/styled-components';
import { GetKeyframe, ShapeProps } from 'types/styled-components';

const Shape = styled.div<ShapeProps>`
  position: absolute;
  overflow: hidden;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ styles }): number => styles.width}%;
  height: ${({ styles }): number => styles.height}%;
  border: ${({ styles }): string => styles?.border};
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
  background-clip: ${({ styles }): string => styles?.backgroundClip};
  transform: ${({ styles }): string => styles?.transform};
  animation-name: ${({ styles }): GetKeyframe =>
    styles?.animationName && getKeyframe};
  animation-duration: ${({ styles }): string => styles?.animationDuration};
  animation-timing-function: ${({ styles }): string =>
    styles?.animationTimingFunction};
  animation-iteration-count: ${({ styles }): string =>
    styles?.animationIterationCount};
  animation-delay: ${({ styles }): string => styles?.animationDelay};
`;

export const Rectangle = styled(Shape)`
  border-radius: ${({ styles }): string => styles?.borderRadius};
`;

export const Circle = styled(Shape)`
  width: ${({ styles }): number => styles.radius * 2}px;
  height: ${({ styles }): number => styles.radius * 2}px;
  border-radius: ${({ styles }): string => styles?.borderRadius || '100%'};
`;

export const Triangle: React.FC<ShapeProps> = (props): JSX.Element => {
  const TopBlock = styled.div`
    position: absolute;
    top: -22px;
    width: 100%;
    height: 50%;
    background-color: ${({ theme }): string => theme.background};
  `;

  const RightBlock = styled.div`
    position: absolute;
    top: -16px;
    right: -12px;
    width: 50%;
    height: 100%;
    background-color: ${({ theme }): string => theme.background};
    transform: rotate(-45deg);
  `;

  const BottomBlock = styled.div`
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 50%;
    background-color: ${({ theme }): string => theme.background};
  `;

  const LeftBlock = styled.div`
    position: absolute;
    top: -16px;
    left: -12px;
    width: 50%;
    height: 100%;
    background-color: ${({ theme }): string => theme.background};
    transform: rotate(45deg);
  `;

  return (
    <Rectangle {...props}>
      <TopBlock />
      <BottomBlock />
      <LeftBlock />
      <RightBlock />
    </Rectangle>
  );
};

export const CircleTunnel: React.FC<ShapeProps> = (props): JSX.Element => {
  const TopHalf = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 40%;
    background-color: ${({ theme }): string => theme.inverted};
    border-radius: 100% 100% 0 0;
  `;

  const BottomHalf = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40%;
    background-color: ${({ theme }): string => theme.inverted};
    border-radius: 0 0 100% 100%;
  `;

  return (
    <Circle {...props}>
      <TopHalf className='envObject nested' />
      <BottomHalf className='envObject nested' />
    </Circle>
  );
};
