import { memo, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { updateDataGame } from 'firebase/db';
import { ContextFirebase } from 'contexts/firebase';
import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px solid;
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

  const timerRef = useRef(timer);

  const handleTimer = (): void => {
    if (timerRef.current === 0) {
      updateDataGame('floatingPoint', {
        state: 'eval',
        timestampEnd: Date.now()
      });
    } else {
      updateDataGame('floatingPoint', { timer: timerRef.current - 1 });
    }
  };

  useEffect(() => {
    timerRef.current = timer;
  });

  useEffect(() => {
    if (uid !== undefined && admin !== undefined && uid === admin) {
      window.setTimeout(handleTimer, 1000);
    }
  });

  return <Container>{timer}</Container>;
};

export default memo(Timer);
