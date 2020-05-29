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
  ControlKeys,
  Key,
  ObjectsOverlap,
  Position
} from 'types/games/floating-point-online';

import {
  updateDataPlayer,
  updateDataFP,
  updateDataUserGame
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
  const [objects, setObjects] = useState<Envs>(null);

  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);
  const statesFP = useContext(ContextFP);

  const { dimensions } = DEFAULTS;
  const { user } = statesFirebase;
  const { width, height } = statesGame;
  const { top: fPTop, left: fPLeft } = statesFP;

  const playerLocal = user?.uid;
  const playerLocalTop = statesPlayers[playerLocal]?.top;
  const playerLocalLeft = statesPlayers[playerLocal]?.left;

  const playerWidthPerc = (dimensions / width) * 100;
  const playerHeightPerc = (dimensions / height) * 100;

  const handleMoveRef = useRef(null);

  const objectsOverlap: ObjectsOverlap = modifiedPlayerPos => {
    let playerTop: number;
    let playerLeft: number;

    const [direction, value] = modifiedPlayerPos;

    switch (direction) {
      case 'top':
        playerTop = value;
        playerLeft = playerLocalLeft;
        break;

      case 'left':
        playerTop = playerLocalTop;
        playerLeft = value;
        break;
    }

    for (const object of objects) {
      for (const shape of object.shapes) {
        const [shapeWidth, shapeHeight] = shape.dimensions;
        const [shapeTop, shapeLeft] = shape.positions;

        const shapeWidthPerc = (shapeWidth / width) * 100;
        const shapeHeightPerc = (shapeHeight / height) * 100;

        if (
          playerTop + playerHeightPerc >= shapeTop &&
          playerTop <= shapeTop + shapeHeightPerc &&
          playerLeft + playerWidthPerc >= shapeLeft &&
          playerLeft <= shapeLeft + shapeWidthPerc
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const fpOverlap = (): void => {
    if (
      playerLocalTop + playerHeightPerc >= fPTop &&
      playerLocalTop <= fPTop + playerHeightPerc &&
      playerLocalLeft + playerWidthPerc >= fPLeft &&
      playerLocalLeft <= fPLeft + playerWidthPerc
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
            playerLocalTop + playerHeightPerc >= 100 ||
            playerLocalLeft + playerWidthPerc >= 100
          ) {
            continue;
          }

          break;
      }

      let dimension: number;
      let px: number;
      let prevPos: number;
      let newPos: number;
      let objectOverlap: boolean;

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
      objectOverlap = objectsOverlap([direction, newPos]);

      if (objectOverlap) continue;

      updatedPos[direction] = newPos;
    }

    await updateDataPlayer('floatingPoint', playerLocal, {
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

      const key = e.key;

      console.log(key);

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
      console.log('listeners removed');
      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);
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
