import React, { useContext } from 'react';
import styled from 'styled-components';

import OptionsCommon from './options-common';
import OptionsPlayer from './options-player';

import {
  ContainerRow,
  ContainerRowCenter
} from '../../styled-components/containers';

import { ContextGame } from '../../../contexts/games/floating-point';

const Container = styled(ContainerRow)`
  height: 35%;
  padding: 10px;
  border-top: 1px solid;
`;

const Side = styled(ContainerRowCenter)`
  width: 40%;
`;

const ControlPanel: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);

  const players = states.players;
  const PL = players.indexOf('left');
  const PR = players.indexOf('right');

  return (
    <Container>
      <Side>
        <OptionsPlayer player='P1' />

        {PL !== -1 && <OptionsPlayer player={`P${PL + 1}`} />}
      </Side>

      <OptionsCommon />

      <Side>
        {PR !== -1 && <OptionsPlayer player={`P${PR + 1}`} />}

        <OptionsPlayer player='P2' />
      </Side>
    </Container>
  );
};

export default React.memo(ControlPanel);
