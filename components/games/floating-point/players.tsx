import React, { useContext } from 'react';
import styled from 'styled-components';

import { Shapes } from '../../../types/games/floating-point';
import {
  ContextGame,
  ContextPlayers,
  ContextParams
} from '../../../contexts/games/floating-point';

const shapes: Shapes = {
  square: {
    viewBox: '3.7 3.7 16.3 16.3',
    path:
      'M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H7c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z'
  },
  circle: {
    viewBox: '1 1 22 22',
    path:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
  },
  triangle: {
    viewBox: '1.5 1.5 21 21',
    path: 'M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z'
  },
  cross: {
    viewBox: '3.7 3.7 16.3 16.3',
    path:
      'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
  }
};

const Players: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);

  const playersCount = statesGame.players.length;
  const {
    P1: { top: topP1, left: leftP1 },
    P2: { top: topP2, left: leftP2 }
  } = statesPlayers;

  const {
    dimensions,
    P1: { shape: shapeP1, color: colorP1 },
    P2: { shape: shapeP2, color: colorP2 }
  } = statesParams;

  const points: Array<JSX.Element> = [];

  const IconP1 = styled.div`
    position: absolute;
    top: ${topP1}px;
    left: ${leftP1}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
  `;

  points.push(
    <IconP1 key='IconP1'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={shapes[shapeP1].viewBox}>
        <path fill={colorP1} d={shapes[shapeP1].path} />
      </svg>
    </IconP1>
  );

  const IconP2 = styled.div`
    position: absolute;
    top: ${topP2}px;
    left: ${leftP2}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
  `;

  points.push(
    <IconP2 key='IconP2'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={shapes[shapeP2].viewBox}>
        <path fill={colorP2} d={shapes[shapeP2].path} />
      </svg>
    </IconP2>
  );

  if (playersCount > 2) {
    const { top: topP3, left: leftP3 } = statesPlayers.P3;
    const { shape: shapeP3, color: colorP3 } = statesParams.P3;

    const IconP3 = styled.div`
      position: absolute;
      top: ${topP3}px;
      left: ${leftP3}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
    `;

    points.push(
      <IconP3 key='IconP3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox={shapes[shapeP3].viewBox}
        >
          <path fill={colorP3} d={shapes[shapeP3].path} />
        </svg>
      </IconP3>
    );
  }

  if (playersCount > 3) {
    const { top: topP4, left: leftP4 } = statesPlayers.P4;
    const { shape: shapeP4, color: colorP4 } = statesParams.P4;

    const IconP4 = styled.div`
      position: absolute;
      top: ${topP4}px;
      left: ${leftP4}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
    `;

    points.push(
      <IconP4 key='IconP4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox={shapes[shapeP4].viewBox}
        >
          <path fill={colorP4} d={shapes[shapeP4].path} />
        </svg>
      </IconP4>
    );
  }

  return <>{points}</>;
};

export default React.memo(Players);
