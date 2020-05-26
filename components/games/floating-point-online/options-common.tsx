import { useContext, memo } from 'react';
import styled from 'styled-components';

import Timer from './timer';
import EnvOptions from './env-options';

import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
`;

const OptionsCommon: React.FC = (): JSX.Element => {
  const statesGame = useContext(ContextGame);

  const { state } = statesGame;

  return (
    <Container>
      {state === 'run' && <Timer />}

      {state === 'conf' && <EnvOptions />}
    </Container>
  );
};

export default memo(OptionsCommon);
