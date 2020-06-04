import { memo, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { crudDataGame } from 'firebase/db';
import { ContextFirebase } from 'contexts/firebase';
import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 2px solid;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const Timer: React.FC = (): JSX.Element => {
  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);

  const { user } = statesFirebase;
  const { admin, timer } = statesGame;

  const uid = user?.uid;

  useEffect(() => {
    if (uid !== undefined && admin !== undefined && uid === admin) {
      const handleTimer = (): void => {
        if (timer === 0) {
          crudDataGame('floatingPoint', 'update', {
            state: 'eval',
            timestampEnd: Date.now()
          });

          setTimeout(() => {
            crudDataGame('floatingPoint', 'update', {
              state: 'reset'
            });
          }, 10000);
        } else {
          crudDataGame('floatingPoint', 'update', { timer: timer - 1 });
        }
      };

      window.setTimeout(handleTimer, 1000);
    }
  });

  return <Container>{timer}</Container>;
};

export default memo(Timer);
