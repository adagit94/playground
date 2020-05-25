import { memo, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { updateDataGame } from 'firebase/db';
import { ContextFirebase } from 'contexts/firebase';
import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};*/
`;

const EnvOptions: React.FC = (): JSX.Element => {
  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);

  const { user } = statesFirebase;
  const { admin, timer } = statesGame;

  const uid = user?.uid;

  useEffect(() => {});

  return <Container></Container>;
};

export default memo(EnvOptions);
