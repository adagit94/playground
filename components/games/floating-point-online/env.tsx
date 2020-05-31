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
  EnvObjects,
  ControlKeys,
  Key,
  CheckOverlap,
  Position
} from 'types/games/floating-point-online';

import {
  crudDataGamePlayer,
  updateDataFP,
  crudDataUserGame
} from 'firebase/db';

const controlKeys: ControlKeys = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    limit: 'topLeft'
  },
  ArrowRight: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    limit: 'bottomRight'
  },
  ArrowDown: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    limit: 'bottomRight'
  },
  ArrowLeft: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    limit: 'topLeft'
  }
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Env: React.FC<PropsEnv> = ({ env }): JSX.Element => {
  const [objects, setObjects] = useState<EnvObjects>(null);

  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesFP = useContext(ContextFP);

  const { size } = DEFAULTS;
  const { user } = statesFirebase;
  const { width, height } = statesGame;
  const { top: fpTop, left: fpLeft } = statesFP;

  const playerLocal = user?.uid;
  const playerLocalTop = statesPlayers[playerLocal]?.top;
  const playerLocalLeft = statesPlayers[playerLocal]?.left;

  const pointWidthPerc = (size / width) * 100;
  const pointHeightPerc = (size / height) * 100;

  const handleMoveRef = useRef(null);

  const checkOverlap: CheckOverlap = (pointTop, pointLeft) => {
    for (const object of objects) {
      if (object.shape === 'Circle') {
        for (const shape of object.shapes) {
          const shapeSize = shape.size as number;
          const [shapeTop, shapeLeft] = shape.positions;

          const shapeWidthPerc = (shapeSize / width) * 100;
          const shapeHeightPerc = (shapeSize / height) * 100;

          if (
            pointTop + pointHeightPerc >= shapeTop &&
            pointTop <= shapeTop + shapeHeightPerc &&
            pointLeft + pointWidthPerc >= shapeLeft &&
            pointLeft <= shapeLeft + shapeWidthPerc
          ) {
            return true;
          }
        }
      } else {
        for (const shape of object.shapes) {
          const [shapeWidth, shapeHeight] = shape.size as [number, number];
          const [shapeTop, shapeLeft] = shape.positions;

          if (
            pointTop + pointHeightPerc >= shapeTop &&
            pointTop <= shapeTop + shapeHeight &&
            pointLeft + pointWidthPerc >= shapeLeft &&
            pointLeft <= shapeLeft + shapeWidth
          ) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const fpOverlap = (): void => {
    if (
      playerLocalTop + pointHeightPerc >= fpTop &&
      playerLocalTop <= fpTop + pointHeightPerc &&
      playerLocalLeft + pointWidthPerc >= fpLeft &&
      playerLocalLeft <= fpLeft + pointWidthPerc
    ) {
      let fpTop: number;
      let fpLeft: number;
      let overlap: boolean;

      while (overlap || overlap === undefined) {
        fpTop = Math.min(
          ((Math.random() * height) / height) * 100,
          ((height - size) / height) * 100
        );

        fpLeft = Math.min(
          ((Math.random() * width) / width) * 100,
          ((width - size) / width) * 100
        );

        overlap = checkOverlap(fpTop, fpLeft);
      }

      updateDataFP({ top: fpTop, left: fpLeft });

      crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
        score: statesPlayers[playerLocal].score + 1
      });

      crudDataUserGame(playerLocal, 'floatingPoint', 'update', {
        gatheredPoints: statesUser.games.floatingPoint.gatheredPoints + 1
      });
    }
  };

  const handleMove = async (): Promise<void> => {
    let updatedPos = {} as Position;

    for (const controlKey in controlKeys) {
      const key = controlKeys[controlKey] as Key;

      if (key.pressed === false) continue;

      const { operation, direction, limit } = key;

      if (direction in updatedPos) {
        delete updatedPos[direction];

        continue;
      }

      switch (limit) {
        case 'topLeft':
          if (playerLocalTop <= 0 || playerLocalLeft <= 0) continue;
          break;

        case 'bottomRight':
          if (
            (playerLocalTop / height) * 100 + size >= height ||
            (playerLocalLeft / width) * 100 + size >= width
          ) {
            continue;
          }

          break;
      }

      let dimension: number;
      let prevPos: number;
      let newPos: number;
      let px: number;
      let overlap: boolean;

      switch (direction) {
        case 'left':
          dimension = width;
          prevPos = playerLocalLeft;
          break;

        case 'top':
          dimension = height;
          prevPos = playerLocalTop;
          break;
      }

      px = (dimension / 100) * prevPos;

      switch (operation) {
        case 'add':
          px++;
          break;

        case 'subtract':
          px--;
          break;
      }

      newPos = (px / dimension) * 100;
      overlap = checkOverlap(
        direction === 'top' ? newPos : playerLocalTop,
        direction === 'left' ? newPos : playerLocalLeft
      );

      if (overlap) continue;

      updatedPos[direction] = newPos;
    }

    await crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
      ...updatedPos
    });

    fpOverlap();
  };

  useEffect(() => {
    handleMoveRef.current = handleMove;
  });

  useEffect(() => {
    const initEnv = (): void => {
      switch (env) {
        case 'mazeI':
          setObjects(DEFAULTS.enviroments.mazeI);
          break;

        case 'mazeII':
          setObjects(DEFAULTS.enviroments.mazeII);
          break;
      }
    };

    initEnv();
  }, [env]);

  useEffect(() => {
    const registerKey = (e: KeyboardEvent): void => {
      e.preventDefault();

      const key = e.key;

      if (key in controlKeys) {
        if (controlKeys[key].pressed !== true) controlKeys[key].pressed = true;
        handleMoveRef.current();
      }
    };

    const cancelKey = (e: KeyboardEvent): void => {
      const key = e.key;

      if (key in controlKeys) {
        controlKeys[key].pressed = false;
      }
    };

    window.addEventListener('keydown', registerKey);
    window.addEventListener('keyup', cancelKey);

    return (): void => {
      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
    };
  }, []);

  return (
    <Container>
      {objects !== null &&
        objects.map(object => {
          const { shape, shapes } = object;

          if (shape === 'Circle') {
            return shapes.map((shape, i) => {
              const { size, positions } = shape;

              return (
                <Shapes.Circle
                  size={size}
                  top={positions[0]}
                  left={positions[1]}
                  key={i}
                />
              );
            });
          } else {
            const Shape = Shapes[shape];

            return shapes.map((shape, i) => {
              const { size, positions } = shape;

              return (
                <Shape
                  width={size[0]}
                  height={size[1]}
                  top={positions[0]}
                  left={positions[1]}
                  key={i}
                />
              );
            });
          }
        })}

      <Players />
      <Point />
    </Container>
  );
};

export default memo(Env);
