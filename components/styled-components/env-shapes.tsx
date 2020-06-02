import styled from 'styled-components';

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
  transform: ${(props): number => props.styles?.transform};
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
  transform: ${(props): number => props.styles?.transform};
`;
