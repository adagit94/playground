import styled from 'styled-components';

import { AvatarProps } from 'types/styled-components';

const Avatar = styled.div<AvatarProps>`
  width: ${({ width }): number => width}px;
  height: ${({ height }): number => height}px;
  border-radius: 100%;
  background-image: ${({ avatar }): string => `url(${avatar})`};
  background-size: contain;
`;

export default Avatar;
