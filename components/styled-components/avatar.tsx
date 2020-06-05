import styled from 'styled-components';

import { AvatarProps } from 'types/styled-components';

const Avatar = styled.div<AvatarProps>`
  width: ${({ width }): number => width}px;
  height: ${({ height }): number => height}px;
  border-radius: 100%;
  background-image: ${({ theme, avatar }): string =>
    avatar
      ? `url(${avatar})`
      : `url(${window.location.origin}/icons/account-${theme.theme}.svg)`};
  background-size: contain;
`;

export default Avatar;
