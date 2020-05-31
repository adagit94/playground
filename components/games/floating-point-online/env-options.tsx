import { memo, useContext, Fragment } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { paddingContainer } from 'components/styled-components/_variables';
import LoadingIndicator from 'components/styled-components/loading-indicator';
import { InputCustomRadioButton } from 'components/styled-components/inputs';
import {
  DividerVertical,
  DividerHorizontal
} from 'components/styled-components/dividers';

import { crudDataGamePlayer, crudDataGame } from 'firebase/db';
import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { Theming } from 'types/layout';
import { EnvNames } from 'types/games/floating-point-online';
import { ContextFirebase } from 'contexts/firebase';
import {
  ContextGame,
  ContextPlayers
} from 'contexts/games/floating-point-online';

const Container = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: ${paddingContainer};
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};

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

const EnvOptions: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);
  const statesPlayers = useContext(ContextPlayers);

  const { user } = statesFirebase;
  const { envVotes } = statesGame;

  const playerLocal = user?.uid;
  const selectedEnv = statesPlayers[playerLocal]?.selectedEnv;

  const handleVoting = (env: EnvNames): void => {
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
  };

  return (
    <Container>
      <h3>Enviroments:</h3>
      {envVotes === undefined && (
        <LoadingIndicator color={theming.background} />
      )}

      {envVotes !== undefined && (
        <ul>
          {Object.keys(envVotes).map((env, i, arr) => {
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
                        handleVoting(env as EnvNames);
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
