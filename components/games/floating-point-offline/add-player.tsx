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
    fill: #00ff00;
  }
`;

const AddPlayer: React.FC<PropsButton> = ({ pos }) => {
  const states = useContext(ContextGame);
  const dispatches = useContext(ContextDispatchesFP);

  const player = states.players.length === 2 ? 'P3' : 'P4';

  return (
    <>
      <Button
        onClick={(): void => {
          dispatches.game({
            type: 'changePlayers',
            operation: 'add',
            pos
          });

          dispatches.players({
            type: 'changePlayer',
            operation: 'add',
            player
          });

          dispatches.params({
            type: 'changePlayer',
            operation: 'add',
            player
          });
        }}
        type='button'
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='7 7 10 10'>
          <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
        </svg>
      </Button>
    </>
  );
};

export default memo(AddPlayer);
