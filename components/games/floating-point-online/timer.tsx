import { memo, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { updateDataGame } from '../../../firebase/db';
import { ContextFirebase } from '../../../contexts/firebase';
import { ContextGame } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 20%;
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
`;

let timerInterval: number;

const Timer: React.FC = (): JSX.Element => {
  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);
  const handleTimerRef = useRef(null);

  const { user } = statesFirebase;
  const { admin, timer } = statesGame;

  const uid = user && user.uid;

  const handleTimer = (): void => {
    if (timer === 0) {
      window.clearInterval(timerInterval);

      updateDataGame('floatingPoint', { state: 'eval' });
    } else {
      updateDataGame('floatingPoint', { timer: timer - 1 });
    }
  };

  useEffect(() => {
    handleTimerRef.current = handleTimer;
  });

  useEffect(() => {
    if (uid && admin && uid === admin) {
      timerInterval = window.setInterval(handleTimerRef.current, 1000);
    }

    return (): void => {
      console.log('timer: unmounted');
      //window.clearInterval(timerInterval);
    };
  }, [uid, admin]);

  return <Container>{timer}</Container>;
};

export default memo(Timer);
