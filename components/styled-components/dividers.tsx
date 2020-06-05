import styled from 'styled-components';

import { DividerProps } from 'types/styled-components';

export const DividerVertical = styled.div<DividerProps>`
  height: 100%;
  width: 2px;
  margin: 0 10px;
  display: inline-block;
  background-color: ${({ theme, color }): string => theme[color]};
`;

export const DividerHorizontal = styled.div<DividerProps>`
  width: 100%;
  height: 2px;
  margin: 10px 0;
  background-color: ${({ theme, color }): string => theme[color]};
`;
