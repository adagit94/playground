import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Env from './env';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import {
  WindowEval,
  WindowEvalResults,
  WindowEvalResultsTie
} from 'components/styled-components/windows';

import { ContextGame } from 'contexts/games/floating-point-online';
import { Theming } from 'types/layout';
import {
  PlayerResultData,
  PlayerResultsData
} from 'types/games/floating-point-online';

const Container = styled.div`
  height: 70%;
  position: relative;
`;

const Monitor: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesGame = useContext(ContextGame);

  const { state, env, winner } = statesGame;

  const tie = Array.isArray(winner);

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
              {tie && (
                <>
                  <WindowEvalResultsTie>Tie: nobody wins</WindowEvalResultsTie>
                  <div>
                    Players:{' '}
                    {(winner as PlayerResultsData).map((player, i, arr) => {
                      const name =
                        i === arr.length - 1 ? player.name : `${player.name}, `;

                      return name;
                    })}
                    ;
                  </div>
                  <div>Scores: {winner[0].score}</div>
                </>
              )}

              {!tie && (
                <>
                  <div>Player: {(winner as PlayerResultData).name}</div>
                  <div>Score: {(winner as PlayerResultData).score}</div>
                </>
              )}
            </WindowEvalResults>
          )}
        </WindowEval>
      )}

      {state === 'run' && <Env env={env} />}
    </Container>
  );
};

export default memo(Monitor);
