import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import {
  DEFAULTS,
  getAvatarPlaceholder
} from 'defaults/games/floating-point-online';
import { PlayerIconProps } from 'types/styled-components';
import { Theming } from 'types/layout';
import { ContextPlayers } from 'contexts/games/floating-point-online';

const PlayerIcon = styled.div.attrs<PlayerIconProps>(({ top, left }) => ({
  style: {
    top: `${top}%`,
    left: `${left}%`
  }
}))<PlayerIconProps>`
  position: absolute;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  border-radius: 100%;
  background-image: url(${({ avatar }): string => avatar});
  background-size: contain;
`;

const Players: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesPlayers = useContext(ContextPlayers);

  const { size } = DEFAULTS;

  let points: Array<JSX.Element> = [];

  for (const player in statesPlayers) {
    const { top, left, avatar } = statesPlayers[player];

    points.push(
      <PlayerIcon
        avatar={
          avatar ||
          getAvatarPlaceholder(theming.theme === 'light' ? 'dark' : 'light')
        }
        top={top}
        left={left}
        size={size}
        className={'player'}
        key={player}
      />
    );
  }

  return <>{points}</>;
};

export default memo(Players);
