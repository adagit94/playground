import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonOptions } from '../../styled-components/buttons';

import {
  ContextGame,
  ContextParams,
  ContextDispatchesFP
} from '../../../contexts/games/floating-point-online';

const Button = styled(ButtonOptions)`
  margin-right: 10px;

  svg path {
    fill: ${(props): string => props.theme.inverted};
  }
`;

const Play: React.FC = () => {
  const statesGame = useContext(ContextGame);
  const statesParams = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  const state = statesGame.state;



  return (
    <>
      <Button
        onClick={
          state === 'conf'
            ? handlePlay
            : (): void =>
                dispatches.game({
                  type: 'changeState',
                  state: state === 'running' ? 'paused' : 'running'
                })
        }
        type='button'
      >
        {state === 'running' ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='5 3 15 15'>
            <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='6 4.5 13 14.5'>
            <path d='M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z' />
          </svg>
        )}
      </Button>
    </>
  );
};

export default React.memo(Play);
