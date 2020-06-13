import styled from 'styled-components';
import $ from 'jquery';
import {
  memo,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback
} from 'react';

import * as EnvObjects from './_env-objects';
import Players from './players';
import FPIcon from './point';

import { DEFAULTS } from 'defaults/games/floating-point-online';
import { positionExtractReg } from 'regs/dom';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import {
  ContextGame,
  ContextPlayers,
  ContextFP
} from 'contexts/games/floating-point-online';

import {
  PropsEnv,
  EnvObjectsList,
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

let handleMoveInterval: number;

const controlKeys: ControlKeys = {
  ArrowUp: {
    pressed: false,
    operation: 'subtract',
    direction: 'top',
    limit: 'top'
  },
  ArrowRight: {
    pressed: false,
    operation: 'add',
    direction: 'left',
    limit: 'right'
  },
  ArrowDown: {
    pressed: false,
    operation: 'add',
    direction: 'top',
    limit: 'bottom'
  },
  ArrowLeft: {
    pressed: false,
    operation: 'subtract',
    direction: 'left',
    limit: 'left'
  }
};

const registerKey = (e: KeyboardEvent): void => {
  e.preventDefault();

  const key = e.key;

  if (key in controlKeys && controlKeys[key].pressed !== true) {
    controlKeys[key].pressed = true;
  }
};

const cancelKey = (e: KeyboardEvent): void => {
  const key = e.key;

  if (key in controlKeys) {
    controlKeys[key].pressed = false;
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
  const [objectsDefinitions, setObjectsDefinitions] = useState<EnvObjectsList>(
    null
  );

  const [objectsComponents, setObjectsComponents] = useState<JSX.Element[][]>(
    null
  );

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
  const userGatheredPoints = statesUser?.games.floatingPoint.gatheredPoints;

  const playerLocalTop = statesPlayers[playerLocal]?.top;
  const playerLocalLeft = statesPlayers[playerLocal]?.left;
  const playerLocalScore = statesPlayers[playerLocal]?.score;

  const pointWidth = (size / width) * 100;
  const pointHeight = (size / height) * 100;

  let widthRef = useRef(width);
  let heightRef = useRef(height);
  let userGatheredPointsRef = useRef(userGatheredPoints);
  let playerLocalTopRef = useRef(playerLocalTop);
  let playerLocalLeftRef = useRef(playerLocalLeft);
  let playerLocalScoreRef = useRef(playerLocalScore);
  let fpTopRef = useRef(fpTop);
  let fpLeftRef = useRef(fpLeft);

  const checkOverlap: CheckOverlap = useCallback(
    (pointTop, pointLeft) => {
      let overlap = false;

      $('.envObject').each(function() {
        const object = $(this);
        const isNested = object.hasClass('nested');

        let { top: objectTop, left: objectLeft } = object.position();
        let { height: objectHeight, width: objectWidth }: any = object.css([
          'width',
          'height'
        ]);

        objectHeight = positionExtractReg.exec(objectHeight)[0];
        objectWidth = positionExtractReg.exec(objectWidth)[0];

        objectTop = (objectTop / height) * 100;
        objectLeft = (objectLeft / width) * 100;
        objectHeight = (objectHeight / height) * 100;
        objectWidth = (objectWidth / width) * 100;

        if (isNested) {
          const {
            top: parentTop,
            left: parentLeft
          } = object.parent().position();

          objectTop += (parentTop / height) * 100;
          objectLeft += (parentLeft / width) * 100;
        }

        if (
          pointTop + pointHeight >= objectTop &&
          pointTop <= objectTop + objectHeight &&
          pointLeft + pointWidth >= objectLeft &&
          pointLeft <= objectLeft + objectWidth
        ) {
          overlap = true;

          return;
        }
      });

      return overlap;
    },
    [width, height, pointWidth, pointHeight]
  );

  const handleMove = useCallback(() => {
    const width = widthRef.current;
    const height = heightRef.current;
    const playerLocalTop = playerLocalTopRef.current;
    const playerLocalLeft = playerLocalLeftRef.current;

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
        case 'top':
          if (playerLocalTop <= 0) continue;
          break;

        case 'right':
          if (playerLocalLeft + (size / width) * 100 >= 100) continue;
          break;

        case 'bottom':
          if (playerLocalTop + (size / height) * 100 >= 100) continue;
          break;

        case 'left':
          if (playerLocalLeft <= 0) continue;
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

    crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
      ...updatedPos
    });

    const fpTop = fpTopRef.current;
    const fpLeft = fpLeftRef.current;

    if (
      playerLocalTop + pointHeight >= fpTop &&
      playerLocalTop <= fpTop + pointHeight &&
      playerLocalLeft + pointWidth >= fpLeft &&
      playerLocalLeft <= fpLeft + pointWidth
    ) {
      const gatheredPoints = userGatheredPointsRef.current;
      const score = playerLocalScoreRef.current;

      let fpTopNew: number;
      let fpLeftNew: number;
      let overlap: boolean;

      while (overlap || overlap === undefined) {
        fpTopNew = Math.min(
          ((Math.random() * height) / height) * 100,
          ((height - size) / height) * 100
        );

        fpLeftNew = Math.min(
          ((Math.random() * width) / width) * 100,
          ((width - size) / width) * 100
        );

        overlap = checkOverlap(fpTopNew, fpLeftNew);
      }
      console.log(overlap);
      updateDataFP({ top: fpTopNew, left: fpLeftNew });

      crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
        score: score + 1
      });

      crudDataUserGame(playerLocal, 'floatingPoint', 'update', {
        gatheredPoints: gatheredPoints + 1
      });
    }
  }, [checkOverlap, size, playerLocal, pointWidth, pointHeight]);

  useEffect(() => {
    widthRef.current = width;
    heightRef.current = height;
    userGatheredPointsRef.current = userGatheredPoints;
    playerLocalTopRef.current = playerLocalTop;
    playerLocalLeftRef.current = playerLocalLeft;
    playerLocalScoreRef.current = playerLocalScore;
    fpTopRef.current = fpTop;
    fpLeftRef.current = fpLeft;
  });

  useEffect(() => {
    switch (env) {
      case 'testI':
        setObjectsDefinitions(DEFAULTS.enviroments.testI);
        break;

      case 'testII':
        setObjectsDefinitions(DEFAULTS.enviroments.testII);
        break;
    }
  }, [env]);

  useEffect(() => {
    if (objectsDefinitions !== null && objectsComponents === null) {
      const components = objectsDefinitions.map(envObject => {
        const { object, styles, positions } = envObject;
        const EnvObject = EnvObjects[object];

        const cName = object !== 'CircleTunnel' ? 'envObject' : null;

        return positions.map((pos, i) => {
          let [top, left] = pos;

          if (object === 'CircleTunnel') {
            top -= (styles.radius / height) * 100;
          }

          return (
            <EnvObject
              top={top}
              left={left}
              styles={styles}
              className={cName}
              key={i}
            />
          );
        });
      });

      setObjectsComponents(components);
    }
  }, [height, objectsDefinitions, objectsComponents]);

  useEffect(() => {
    window.addEventListener('keydown', registerKey);
    window.addEventListener('keyup', cancelKey);

    handleMoveInterval = window.setInterval(handleMove, 50);

    return (): void => {
      console.log('removed key listeners');
      window.removeEventListener('keydown', registerKey);
      window.removeEventListener('keyup', cancelKey);

      window.clearInterval(handleMoveInterval);
    };
  }, [handleMove]);

  return (
    <Container>
      {objectsComponents !== null && objectsComponents}

      <Players />
      <FPIcon />
    </Container>
  );
};

export default memo(Env);
