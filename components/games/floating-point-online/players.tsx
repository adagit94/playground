import { useContext, memo } from 'react';
import styled from 'styled-components';

import { DEFAULTS } from 'defaults/games/floating-point-online';
import { PlayerIconProps } from 'types/styled-components';
import { ContextPlayers } from 'contexts/games/floating-point-online';

const PlayerIcon = styled.div<PlayerIconProps>`
  position: absolute;
  top: ${({ top }): number => top}%;
  left: ${({ left }): number => left}%;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  border-radius: 100%;
  background-image: url(${({ avatar }): string => avatar});
  background-size: contain;
`;

const Players: React.FC = (): JSX.Element => {
  const statesPlayers = useContext(ContextPlayers);

  const { size } = DEFAULTS;

  let points: Array<JSX.Element> = [];

  for (const player in statesPlayers) {
    const { top, left, avatar } = statesPlayers[player];

    points.push(
      <PlayerIcon
        avatar={avatar}
        top={top}
        left={left}
        size={size}
        key={player}
      />
    );
  }

  return <>{points}</>;
};

export default memo(Players);
