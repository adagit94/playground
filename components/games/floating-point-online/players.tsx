import { useContext, memo } from 'react';
import styled from 'styled-components';

import Defaults from '../../../defaults/games/floating-point-online';
import { ContextPlayers } from '../../../contexts/games/floating-point-online';

const Players: React.FC = (): JSX.Element => {
  const statesPlayers = useContext(ContextPlayers);

  const { dimensions } = Defaults;

  const points: Array<JSX.Element> = [];

  for (const player in statesPlayers) {
    const Icon = styled.div`
      position: absolute;
      top: ${statesPlayers[player].top}%;
      left: ${statesPlayers[player].left}%;
      width: ${dimensions}px;
      height: ${dimensions}px;
      border-radius: 100%;
      background-image: url(${statesPlayers[player].avatar});
      background-size: contain;
    `;

    points.push(<Icon key={player} />);
  }

  return <>{points}</>;
};

export default memo(Players);
