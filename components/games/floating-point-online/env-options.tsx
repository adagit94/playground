import { memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { updateDataGame, getDataGame } from 'firebase/db';
import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { EnvNamesEdited } from 'types/games/floating-point-online';
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
  const [votes, setVotes] = useState<[EnvNamesEdited, number][]>([]);

  const statesFirebase = useContext(ContextFirebase);
  const statesGame = useContext(ContextGame);

  const { user } = statesFirebase;
  const { admin, envVotes } = statesGame;

  const uid = user?.uid;

  useEffect(() => {
    const adjustVotes = (): void => {
      const votes: [EnvNamesEdited, number][] = [];

      for (const vote in envVotes) {
        const editedVote = vote.replace(
          keyEditReg,
          keyReplacer
        ) as EnvNamesEdited;

        votes.push([editedVote, envVotes[vote]]);
      }

      setVotes(votes);
    };

    if (envVotes !== undefined) adjustVotes();
  }, [envVotes]);

  return (
    <Container>
      <label>Enviroments:</label>
      {votes.map(env => {
        const [name, value] = env;

        return <input value={name} name={name} type='radio' key={name} />;
      })}
    </Container>
  );
};

export default memo(EnvOptions);
