import { memo, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { paddingContainer } from 'components/styled-components/_variables';
import LoadingIndicator from 'components/styled-components/loading-indicator';
import { InputCustomRadioButton } from 'components/styled-components/inputs';
import {
  DividerVertical,
  DividerHorizontal
} from 'components/styled-components/dividers';

import { updateDataGame } from 'firebase/db';
import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { Theming } from 'types/layout';
import { EnvNames } from 'types/games/floating-point-online';
import { ContextGame } from 'contexts/games/floating-point-online';

const Container = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      justify-content: space-between;
      align-items: center;
      height: 25px;
    }
  }
`;

const EnvOptions: React.FC = (): JSX.Element => {
  const [selectedEnv, setSelectedEnv] = useState<EnvNames>(undefined);

  const theming: Theming = useContext(ThemeContext);
  const statesGame = useContext(ContextGame);

  const { envVotes } = statesGame;

  const handleVoting = (env: EnvNames): void => {
    if (selectedEnv !== undefined) {
      updateDataGame('floatingPoint', {
        envVotes: {
          ...envVotes,
          [selectedEnv]: envVotes[selectedEnv] - 1,
          [env]: envVotes[env] + 1
        }
      });
    } else {
      updateDataGame('floatingPoint', {
        envVotes: {
          ...envVotes,
          [env]: envVotes[env] + 1
        }
      });
    }

    setSelectedEnv(env);
  };

  return (
    <Container>
      <div>Enviroments:</div>
      {envVotes === undefined && (
        <LoadingIndicator color={theming.background} />
      )}

      {envVotes !== undefined && (
        <ul>
          {Object.keys(envVotes).map((env, i, arr) => {
            const votes = envVotes[env];
            const editedEnvName = env.replace(keyEditReg, keyReplacer);

            return (
              <>
                <li key={env}>
                  <span>{votes}</span>
                  <DividerVertical color='background' />
                  <InputCustomRadioButton
                    onClick={(): void => {
                      handleVoting(env as EnvNames);
                    }}
                    checked={selectedEnv === env ? true : false}
                  />
                  <span>{editedEnvName}</span>
                </li>
                {i < arr.length - 1 && <DividerHorizontal color='background' />}
              </>
            );
          })}
        </ul>
      )}
    </Container>
  );
};

export default memo(EnvOptions);
