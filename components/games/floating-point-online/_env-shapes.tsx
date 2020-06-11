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
  background-color: ${({ styles, theme }): string =>
    styles?.backgroundColor || theme.inverted};
  transform: ${({ styles }): string => styles?.transform};
  animation-name: ${({ styles }): GetKeyframe =>
    styles?.animationName && getKeyframe};
  animation-duration: ${({ styles }): string => styles?.animationName && '5s'};
  animation-timing-function: ${({ styles }): string =>
    styles?.animationName && 'linear'};
  animation-iteration-count: ${({ styles }): string =>
    styles?.animationName && 'infinite'};
`;

export const Rectangle = styled(Shape)`
  border-radius: ${({ styles }): string => styles?.borderRadius};
`;

export const Circle = styled(Shape)`
  width: ${({ styles }): number => styles.width}px;
  height: ${({ styles }): number => styles.height}px;
  border-radius: 100%;
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
    <Shape {...props}>
      <TopBlock />
      <BottomBlock />
      <LeftBlock />
      <RightBlock />
    </Shape>
  );
};

export const TriangularSquare: React.FC<ShapeProps> = (props): JSX.Element => {
  const { width, height } = props.styles;

  const sharedTriangleStyles = {
    width: 60,
    height: 30
  };

  const { width: triangleWidth, height: triangleHeight } = sharedTriangleStyles;

  const topTriangleStyles = {
    ...sharedTriangleStyles
  };

  const rightTriangleStyles = {
    ...sharedTriangleStyles,
    transform: 'rotate(90deg)'
  };

  const bottomTriangleStyles = {
    ...sharedTriangleStyles,
    transform: 'rotate(180deg)'
  };

  const leftTriangleStyles = {
    ...sharedTriangleStyles,
    transform: 'rotate(-90deg)'
  };

  return (
    <Shape {...props}>
      <Triangle
        top={0}
        left={((width / 2 - triangleWidth / 2) / width) * 100}
        styles={topTriangleStyles}
      />
      <Triangle
        top={((height / 2 - triangleHeight / 2) / height) * 100}
        left={
          100 +
          (triangleHeight / 2 / height) * 100 -
          (triangleWidth / width) * 100
        }
        styles={rightTriangleStyles}
      />
      <Triangle
        top={100 - (triangleHeight / height) * 100}
        left={((width / 2 - triangleWidth / 2) / width) * 100}
        styles={bottomTriangleStyles}
      />
      <Triangle
        top={((height / 2 - triangleHeight / 2) / height) * 100}
        left={0 - (triangleHeight / 2 / height) * 100}
        styles={leftTriangleStyles}
      />
    </Shape>
  );
};
