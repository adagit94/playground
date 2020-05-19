import { useContext, memo, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Players from './players';
import Point from './point';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import {
  WindowEval,
  WindowEvalResults
} from 'components/styled-components/windows';

import { Theming } from 'types/layout';
import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  height: 70%;
  position: relative;
`;

const Monitor: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesGame = useContext(ContextGame);

  const { state, winner } = statesGame;

  return (
    <Container id='monitor'>
      {state === 'eval' && (
        <WindowEval>
          {!winner && <LoadingIndicator color={theming.background} />}

          {winner && (
            <WindowEvalResults>
              <div>Player: {winner.name}</div>
              <div>Score: {winner.score}</div>
            </WindowEvalResults>
          )}
        </WindowEval>
      )}

      {state === 'run' && (
        <>
          <Players />
          <Point />
        </>
      )}
    </Container>
  );
};

export default memo(Monitor);
