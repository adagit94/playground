import { useContext, memo } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from 'components/styled-components/buttons';

import { PropsButton } from 'types/games/floating-point-offline';
import {
  ContextGame,
  ContextDispatchesFP
} from 'contexts/games/floating-point-offline';

const Button = styled(ButtonOptions)`
  svg path {
    fill: #ff0000;
  }
`;

const RemovePlayer: React.FC<PropsButton> = ({ pos }): JSX.Element => {
  const statesGame = useContext(ContextGame);
  const dispatches = useContext(ContextDispatchesFP);

  const player = `P${statesGame.players.indexOf(pos) + 1}`;

  return (
    <>
      <Button
        onClick={(): void => {
          dispatches.game({
            type: 'changePlayers',
            operation: 'remove',
            pos
          });

          dispatches.players({
            type: 'changePlayer',
            operation: 'remove',
            player
          });

          dispatches.params({
            type: 'changePlayer',
            operation: 'remove',
            player
          });
        }}
        type='button'
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='7 7 10 10'>
          <path d='M19 13H5v-2h14v2z' />
        </svg>
      </Button>
    </>
  );
};

export default memo(RemovePlayer);
