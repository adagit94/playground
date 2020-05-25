import styled from 'styled-components';

export const Square = styled.div`
  position: absolute;
  top: ${(props): number => props.top}%;
  left: ${(props): number => props.left}%;
  width: ${(props): number => props.width}px;
  height: ${(props): number => props.height}px;
  background-color: ${(props): string => props.theme.inverted};
`;

export const Circle = styled.div`
  position: absolute;
  top: ${(props): number => props.top}%;
  left: ${(props): number => props.left}%;
  width: ${(props): number => props.width}px;
  height: ${(props): number => props.height}px;
  border-radius: 100%;
  background-color: ${(props): string => props.theme.inverted};
`;
