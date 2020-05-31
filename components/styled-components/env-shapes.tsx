import styled from 'styled-components';

export const Rectangle = styled.div`
  position: absolute;
  top: ${(props): number => props.top}%;
  left: ${(props): number => props.left}%;
  width: ${(props): number => props.width}%;
  height: ${(props): number => props.height}%;
  background-color: ${(props): string => props.theme.inverted};
`;

export const Circle = styled.div`
  position: absolute;
  top: ${(props): number => props.top}%;
  left: ${(props): number => props.left}%;
  width: ${(props): number => props.size}px;
  height: ${(props): number => props.size}px;
  background-color: ${(props): string => props.theme.inverted};
  border-radius: 100%;
`;
