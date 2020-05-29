import { memo, useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import * as Shapes from 'components/styled-components/env-shapes';

import { DEFAULTS } from 'defaults/games/floating-point-online';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import {
  ContextGame,
  ContextPlayers,
  ContextFP
} from 'contexts/games/floating-point-online';

import {
  PropsEnv,
  Envs,
  Operations,
  Directions,
  Limits,
  HandleMove
} from 'types/games/floating-point-online';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Env: React.FC<PropsEnv> = ({ env }): JSX.Element => {
  const [objects, setObjects] = useState<Envs>(null);

  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesFP = useContext(ContextFP);

  const { dimensions } = DEFAULTS;
  const { user } = statesFirebase;
  const { state, width, height } = statesGame;
  const { top: fPTop, left: fPLeft } = statesFP;

  const playerLocal = user?.uid;
  const playerLocalTop = statesPlayers[playerLocal]?.top;
  const playerLocalLeft = statesPlayers[playerLocal]?.left;

  const dimensionsPercHeight = (dimensions / height) * 100;
  const dimensionsPercWidth = (dimensions / width) * 100;

  const handleMoveRef = useRef(null);
  const matchFloatingPointRef = useRef(null);

  const handleMove: HandleMove = key => {
    let operation: Operations;
    let direction: Directions;
    let limit: Limits;

    switch (key) {
      case 'ArrowUp':
        operation = 'subtract';
        direction = 'top';
        limit = 'topLeft';
        break;

      case 'ArrowRight':
        operation = 'add';
        direction = 'left';
        limit = 'bottomRight';
        break;

      case 'ArrowDown':
        operation = 'add';
        direction = 'top';
        limit = 'bottomRight';
        break;

      case 'ArrowLeft':
        operation = 'subtract';
        direction = 'left';
        limit = 'topLeft';
        break;

      default:
        return;
    }

    switch (limit) {
      case 'topLeft':
        if (playerLocalTop <= 0 || playerLocalLeft <= 0) return;
        break;

      case 'bottomRight':
        if (
          playerLocalTop + dimensionsPercHeight >= 100 ||
          playerLocalLeft + dimensionsPercWidth >= 100
        ) {
          return;
        }

        break;
    }

    let dimension: number;
    let playerLocalPos: number;

    switch (direction) {
      case 'left':
        dimension = width;
        playerLocalPos = playerLocalLeft;
        break;

      case 'top':
        dimension = height;
        playerLocalPos = playerLocalTop;
        break;
    }

    let px = (dimension / 100) * playerLocalPos;

    switch (operation) {
      case 'add':
        px++;
        break;

      case 'subtract':
        px--;
        break;
    }

    const newPos = (px / dimension) * 100;

    updateDataPlayer('floatingPoint', playerLocal, {
      [direction]: newPos
    });
  };

  const matchFloatingPoint = (): void => {
    if (
      playerLocalTop + dimensionsPercHeight >= fPTop &&
      playerLocalTop <= fPTop + dimensionsPercHeight &&
      playerLocalLeft + dimensionsPercWidth >= fPLeft &&
      playerLocalLeft <= fPLeft + dimensionsPercWidth
    ) {
      const fpTop = Math.min(
        ((Math.random() * height) / height) * 100,
        ((height - dimensions) / height) * 100
      );

      const fpLeft = Math.min(
        ((Math.random() * width) / width) * 100,
        ((width - dimensions) / width) * 100
      );

      updateDataFP({ top: fpTop, left: fpLeft });

      updateDataPlayer('floatingPoint', playerLocal, {
        score: statesPlayers[playerLocal].score + 1
      });

      updateDataUserGame('floatingPoint', playerLocal, {
        gatheredPoints: statesUser.games.floatingPoint.gatheredPoints + 1
      });
    }
  };

  useEffect(() => {
    handleMoveRef.current = handleMove;
    matchFloatingPointRef.current = matchFloatingPoint;
  });

  useEffect(() => {
    const initEnv = (): void => {
      switch (env) {
        case 'test':
          setObjects(DEFAULTS.enviroments.test);

          break;
      }
    };

    initEnv();
  }, [env]);

  useEffect(() => {
    const registerKey = (e: KeyboardEvent): void => {
      e.preventDefault();

      handleMoveRef.current(e.key);
      matchFloatingPointRef.current();
    };

    window.addEventListener('keydown', registerKey);

    return (): void => {
      window.removeEventListener('keydown', registerKey);
    };
  }, []);

  return (
    <Container>
      {objects !== null &&
        objects.map(object => {
          const { shape, shapes } = object;
          const Shape = Shapes[shape];

          return shapes.map((shape, i) => {
            const { dimensions, positions } = shape;

            return (
              <Shape
                width={dimensions[0]}
                height={dimensions[1]}
                top={positions[0]}
                left={positions[1]}
                key={i}
              />
            );
          });
        })}

      <Players />
      <Point />
    </Container>
  );
};

export default memo(Env);
