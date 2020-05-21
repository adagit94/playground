import { memo, useContext, useEffect } from 'react';
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

  const uid = user && user.uid;

  const handleTimer = (): void => {
    if (timer === 0) {
      updateDataGame('floatingPoint', {
        state: 'eval',
        timestampEnd: Date.now()
      });
    } else {
      updateDataGame('floatingPoint', { timer: timer - 1 });
    }
  };

  useEffect(() => {
    if (uid && admin && uid === admin) {
      window.setTimeout(handleTimer, 1000);
    }
  });

  return <Container>{timer}</Container>;
};

export default memo(Timer);
