import { memo, useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

import Players from './players';
import FPIcon from './point';

import { Shape } from 'components/styled-components/env-shape';

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

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Env: React.FC<PropsEnv> = ({ env }): JSX.Element => {
  const [objectsDefinitions, setObjectsDefinitions] = useState<EnvObjects>(
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
  const playerLocalTop = statesPlayers[playerLocal]?.top;
  const playerLocalLeft = statesPlayers[playerLocal]?.left;

  const pointWidth = (size / width) * 100;
  const pointHeight = (size / height) * 100;

  const handleMoveRef = useRef(null);

  const checkOverlap: CheckOverlap = (pointTop, pointLeft) => {
    let overlap = false;

    $('.envObject').each(function() {
      const object = $(this);

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
  };

  const fpOverlap = async (): Promise<void> => {
    if (
      playerLocalTop + pointHeight >= fpTop &&
      playerLocalTop <= fpTop + pointHeight &&
      playerLocalLeft + pointWidth >= fpLeft &&
      playerLocalLeft <= fpLeft + pointWidth
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const fp = document.querySelector('#fp') as HTMLElement;

      let fpTop: number;
      let fpLeft: number;
      let overlap: boolean;

      fp.style.visibility = 'hidden';

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

      await updateDataFP({ top: fpTop, left: fpLeft });

      fp.style.visibility = 'visible';

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

    await crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
      ...updatedPos
    });

    fpOverlap();
  };

  useEffect(() => {
    handleMoveRef.current = handleMove;
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
      const components = objectsDefinitions.map(object => {
        const { styles, positions } = object;

        return positions.map((pos, i) => {
          const [top, left] = pos;

          return (
            <Shape
              top={top}
              left={left}
              styles={styles}
              className='envObject'
              key={i}
            />
          );
        });
      });

      setObjectsComponents(components);
    }
  }, [objectsDefinitions, objectsComponents]);

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
      {objectsComponents !== null && objectsComponents}

      <Players />
      <FPIcon />
    </Container>
  );
};

export default memo(Env);
