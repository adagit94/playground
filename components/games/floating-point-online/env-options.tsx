import styled, { ThemeContext } from 'styled-components';
import {
  memo,
  useContext,
  Fragment,
  useState,
  useEffect,
  useCallback
} from 'react';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import { InputCustomRadioButton } from 'components/styled-components/inputs';
import {
  DividerVertical,
  DividerHorizontal
} from 'components/styled-components/dividers';

import {
  paddingContainer,
  borderColorHighlight
} from 'components/styled-components/_variables';

import { crudDataGamePlayer, crudDataGame } from 'firebase/db';
import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { Theming } from 'types/layout';
import { EnvOptionsContainerProps } from 'types/styled-components';
import { EnvName, PropsEnvOptions } from 'types/games/floating-point-online';
import { ContextFirebase } from 'contexts/firebase';
import {
  ContextGame,
  ContextPlayers
} from 'contexts/games/floating-point-online';

const Container = styled.div<EnvOptionsContainerProps>`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid
    ${({ highlightEnvOptions, voted }): string =>
      highlightEnvOptions && !voted ? borderColorHighlight : 'transparent'};
  border-radius: 5px;
  padding: ${paddingContainer};
  color: ${({ theme }): string => theme.background};
  background-color: ${({ theme }): string => theme.inverted};

  ul {
    width: 100%;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;

      div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      div:last-child {
        flex: auto;
      }
    }
  }
`;

const EnvOptions: React.FC<PropsEnvOptions> = ({
  highlightEnvOptions
}): JSX.Element => {
  const [voted, setVoted] = useState(false);

  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { user } = statesFirebase;
  const { state, envVotes } = statesGame;

  const playerLocal = user?.uid;
  const selectedEnv = statesPlayers[playerLocal]?.selectedEnv;

  const envList = envVotes && Object.keys(envVotes);

  const handleVoting = useCallback(
    (env: EnvName): void => {
      if (selectedEnv === undefined) {
        crudDataGame('floatingPoint', 'update', {
          envVotes: {
            ...envVotes,
            [env]: envVotes[env] + 1
          }
        });
      } else if (selectedEnv === env) {
        crudDataGame('floatingPoint', 'update', {
          envVotes: {
            ...envVotes,
            [selectedEnv]: envVotes[selectedEnv] - 1
          }
        });
      } else if (selectedEnv !== env) {
        crudDataGame('floatingPoint', 'update', {
          envVotes: {
            ...envVotes,
            [selectedEnv]: envVotes[selectedEnv] - 1,
            [env]: envVotes[env] + 1
          }
        });
      }

      crudDataGamePlayer('floatingPoint', playerLocal, 'update', {
        selectedEnv: selectedEnv === env ? null : env
      });
    },
    [envVotes, playerLocal, selectedEnv]
  );

  useEffect(() => {
    if (state === 'conf') {
      setVoted(false);

      for (const env in envVotes) {
        if (envVotes[env] > 0) {
          setVoted(true);

          break;
        }
      }
    }
  }, [state, envVotes]);

  return (
    <Container highlightEnvOptions={highlightEnvOptions} voted={voted}>
      <h3>Enviroments:</h3>
      {envVotes === undefined && (
        <LoadingIndicator color={theming.background} />
      )}

      {envVotes !== undefined && (
        <ul>
          {envList.map((env, i, arr) => {
            const votes = envVotes[env];
            const editedEnvName = env.replace(keyEditReg, keyReplacer);

            return (
              <Fragment key={env}>
                <li key={env}>
                  <div>
                    <span>{votes}</span>
                    <DividerVertical color='background' />
                  </div>
                  <div>
                    <InputCustomRadioButton
                      onClick={(): void => {
                        handleVoting(env as EnvName);
                      }}
                      checked={selectedEnv === env ? true : false}
                    />
                    <span>{editedEnvName}</span>
                  </div>
                </li>
                {i < arr.length - 1 && <DividerHorizontal color='background' />}
              </Fragment>
            );
          })}
        </ul>
      )}
    </Container>
  );
};

export default memo(EnvOptions);
