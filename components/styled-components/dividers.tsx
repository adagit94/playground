import styled from 'styled-components';

export const DividerVertical = styled.div`
  width: 2px;
  margin: 0 10px;
  display: inline-block;
  background-color: ${(props): string => props.theme[props.color]};
`;

export const DividerHorizontal = styled.div`
  height: 2px;
  margin: 10px 0;
  background-color: ${(props): string => props.theme[props.color]};
`;
