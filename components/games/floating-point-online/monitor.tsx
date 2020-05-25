import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Env from './env';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import {
  WindowEval,
  WindowEvalResults
} from 'components/styled-components/windows';

import { Theming } from 'types/layout';
import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  height: 60%;
`;

const Monitor: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesGame = useContext(ContextGame);

  const { state, env, winner } = statesGame;

  return (
    <Container id='monitor'>
      {state === 'eval' && (
        <WindowEval>
          {winner === undefined && (
            <LoadingIndicator color={theming.background} />
          )}

          {winner !== undefined && (
            <WindowEvalResults>
              <h1>Results</h1>
              <div>Player: {winner.name}</div>
              <div>Score: {winner.score}</div>
            </WindowEvalResults>
          )}
        </WindowEval>
      )}

      {state === 'run' && <Env env={env} />}
    </Container>
  );
};

export default memo(Monitor);
