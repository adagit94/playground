import React, { useContext } from 'react';
import styled from 'styled-components';

import Shape from './shape';
import Color from './color';

import { DividerVertical } from '../../styled-components/dividers';
import { Disabled } from '../../styled-components/overlaps';

import { ContextGame } from '../../../contexts/games/floating-point';
import { PropsOptions } from '../../../types/games/floating-point';

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Options = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding: 10px;
`;

const OptionsPlayer: React.FC<PropsOptions> = ({ player }): JSX.Element => {
  const states = useContext(ContextGame);

  return (
    <Container>
      <Heading>
        <h3>{player}</h3>
      </Heading>
      <Options>
        <Shape player={player} />
        <DividerVertical />
        <Color player={player} />
        {states.state !== 'conf' && <Disabled />}
      </Options>
    </Container>
  );
};

export default React.memo(OptionsPlayer);
