import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import Players from './players';
import Point from './point';

import * as Shapes from 'components/styled-components/env-shapes';

import { DEFAULTS } from 'defaults/games/floating-point-online';
import { PropsEnv, Envs } from 'types/games/floating-point-online';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Env: React.FC<PropsEnv> = ({ env }): JSX.Element => {
  const [objects, setObjects] = useState<Envs>(null);

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
