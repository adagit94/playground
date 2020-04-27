import React, { useContext } from 'react';
import styled from 'styled-components';

import { Icons } from '../../../types/games/floating-point-offline';
import {
  ContextGame,
  ContextPlayers,
  ContextParams
} from '../../../contexts/games/floating-point-offline';
import { ContextFirebase } from '../../../contexts/firebase';

const icons: Icons = {
  ball1: {
    viewBox: '1.6 1.6 21 21',
    path:
      'M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M5.61,16.78C4.6,15.45,4,13.8,4,12 s0.6-3.45,1.61-4.78C7.06,8.31,8,10.05,8,12S7.06,15.69,5.61,16.78z M12,20c-1.89,0-3.63-0.66-5-1.76c1.83-1.47,3-3.71,3-6.24 S8.83,7.23,7,5.76C8.37,4.66,10.11,4,12,4s3.63,0.66,5,1.76c-1.83,1.47-3,3.71-3,6.24s1.17,4.77,3,6.24C15.63,19.34,13.89,20,12,20 z M18.39,16.78C16.94,15.69,16,13.95,16,12s0.94-3.69,2.39-4.78C19.4,8.55,20,10.2,20,12S19.4,15.45,18.39,16.78z'
  },
  ball2: {
    viewBox: '1.6 1.6 21 21',
    path:
      'M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M5.23,7.75 C6.1,8.62,6.7,9.74,6.91,11H4.07C4.22,9.82,4.63,8.72,5.23,7.75z M4.07,13h2.84c-0.21,1.26-0.81,2.38-1.68,3.25 C4.63,15.28,4.22,14.18,4.07,13z M11,19.93c-1.73-0.22-3.29-1-4.49-2.14c1.3-1.24,2.19-2.91,2.42-4.79H11V19.93z M11,11H8.93 C8.69,9.12,7.81,7.44,6.5,6.2C7.71,5.06,9.27,4.29,11,4.07V11z M19.93,11h-2.84c0.21-1.26,0.81-2.38,1.68-3.25 C19.37,8.72,19.78,9.82,19.93,11z M13,4.07c1.73,0.22,3.29,0.99,4.5,2.13c-1.31,1.24-2.19,2.92-2.43,4.8H13V4.07z M13,19.93V13 h2.07c0.24,1.88,1.12,3.55,2.42,4.79C16.29,18.93,14.73,19.71,13,19.93z M18.77,16.25c-0.87-0.86-1.46-1.99-1.68-3.25h2.84 C19.78,14.18,19.37,15.28,18.77,16.25z'
  },
  ball3: {
    viewBox: '1.6 1.6 21 21',
    path:
      'M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M13,4.07 c3.07,0.38,5.57,2.52,6.54,5.36L13,5.65V4.07z M8,5.08c1.18-0.69,3.33-1.06,3-1.02v7.35l-3,1.73V5.08z M4.63,15.1 C4.23,14.14,4,13.1,4,12c0-2.02,0.76-3.86,2-5.27v7.58L4.63,15.1z M5.64,16.83L12,13.15l3,1.73l-6.98,4.03 C7.09,18.38,6.28,17.68,5.64,16.83z M10.42,19.84 M12,20c-0.54,0-1.07-0.06-1.58-0.16l6.58-3.8l1.36,0.78 C16.9,18.75,14.6,20,12,20z M13,11.42V7.96l7,4.05c0,1.1-0.23,2.14-0.63,3.09L13,11.42z'
  },
  ball4: {
    viewBox: '1.6 1.6 21 21',
    path:
      'M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M13,5.3l1.35-0.95 c1.82,0.56,3.37,1.76,4.38,3.34l-0.39,1.34l-1.35,0.46L13,6.7V5.3z M9.65,4.35L11,5.3v1.4L7.01,9.49L5.66,9.03L5.27,7.69 C6.28,6.12,7.83,4.92,9.65,4.35z M7.08,17.11l-1.14,0.1C4.73,15.81,4,13.99,4,12c0-0.12,0.01-0.23,0.02-0.35l1-0.73L6.4,11.4 l1.46,4.34L7.08,17.11z M14.5,19.59C13.71,19.85,12.87,20,12,20s-1.71-0.15-2.5-0.41l-0.69-1.49L9.45,17h5.11l0.64,1.11 L14.5,19.59z M14.27,15H9.73l-1.35-4.02L12,8.44l3.63,2.54L14.27,15z M18.06,17.21l-1.14-0.1l-0.79-1.37l1.46-4.34l1.39-0.47 l1,0.73C19.99,11.77,20,11.88,20,12C20,13.99,19.27,15.81,18.06,17.21z'
  }
};

const Players: React.FC = () => {
  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesParams = useContext(ContextParams);

  const profile = statesGame.profile;
  const user = statesFirebase.user;
  const playersCount = statesGame.players.length;
  const {
    P1: { top: topP1, left: leftP1 },
    P2: { top: topP2, left: leftP2 }
  } = statesPlayers;

  const {
    dimensions,
    P1: { icon: iconP1, color: colorP1 },
    P2: { icon: iconP2, color: colorP2 }
  } = statesParams;

  const points: Array<JSX.Element> = [];

  const IconP1 = styled.div`
    position: absolute;
    top: ${topP1}px;
    left: ${leftP1}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
    border-radius: ${profile === 'P1' && '100%'};
    background-image: url(${profile === 'P1' && user.photoURL});
    background-size: contain;

    svg path {
      fill: ${colorP1};
    }
  `;

  points.push(
    <IconP1 key='IconP1'>
      {profile !== 'P1' && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={icons[iconP1].viewBox}>
          <path d={icons[iconP1].path} />
        </svg>
      )}
    </IconP1>
  );

  const IconP2 = styled.div`
    position: absolute;
    top: ${topP2}px;
    left: ${leftP2}px;
    width: ${dimensions}px;
    height: ${dimensions}px;
    border-radius: ${profile === 'P2' && '100%'};
    background-image: url(${profile === 'P2' && user.photoURL});
    background-size: contain;

    svg path {
      fill: ${colorP2};
    }
  `;

  points.push(
    <IconP2 key='IconP2'>
      {profile !== 'P2' && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={icons[iconP2].viewBox}>
          <path d={icons[iconP2].path} />
        </svg>
      )}
    </IconP2>
  );

  if (playersCount > 2) {
    const { top: topP3, left: leftP3 } = statesPlayers.P3;
    const { icon: iconP3, color: colorP3 } = statesParams.P3;

    const IconP3 = styled.div`
      position: absolute;
      top: ${topP3}px;
      left: ${leftP3}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
      border-radius: ${profile === 'P3' && '100%'};
      background-image: url(${profile === 'P3' && user.photoURL});
      background-size: contain;

      svg path {
        fill: ${colorP3};
      }
    `;

    points.push(
      <IconP3 key='IconP3'>
        {profile !== 'P3' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox={icons[iconP3].viewBox}
          >
            <path d={icons[iconP3].path} />
          </svg>
        )}
      </IconP3>
    );
  }

  if (playersCount > 3) {
    const { top: topP4, left: leftP4 } = statesPlayers.P4;
    const { icon: iconP4, color: colorP4 } = statesParams.P4;

    const IconP4 = styled.div`
      position: absolute;
      top: ${topP4}px;
      left: ${leftP4}px;
      width: ${dimensions}px;
      height: ${dimensions}px;
      border-radius: ${profile === 'P4' && '100%'};
      background-image: url(${profile === 'P4' && user.photoURL});
      background-size: contain;

      svg path {
        fill: ${colorP4};
      }
    `;

    points.push(
      <IconP4 key='IconP4'>
        {profile !== 'P4' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox={icons[iconP4].viewBox}
          >
            <path d={icons[iconP4].path} />
          </svg>
        )}
      </IconP4>
    );
  }

  return <>{points}</>;
};

export default React.memo(Players);
