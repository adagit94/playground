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
  const { admin, timer, timerID } = statesGame;

  const uid = user?.uid;

  const timerRef = useRef(timer);
  const timerIDRef = useRef(timerID);

  const handleTimer = (): void => {
    if (timerRef.current === 0) {
      window.clearInterval(timerIDRef.current);

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
    timerIDRef.current = timerID;
  });

  useEffect(() => {
    if (
      timerID === undefined &&
      uid !== undefined &&
      admin !== undefined &&
      uid === admin
    ) {
      const timerID = window.setInterval(handleTimer, 1000);

      updateDataGame('floatingPoint', { timerID });
    }

    return (): void => {
      console.log('time cleared');
      window.clearInterval(timerID);
    };
  });

  return <Container>{timer}</Container>;
};

export default memo(Timer);
