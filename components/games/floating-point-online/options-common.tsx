import React, { useContext } from 'react';
import styled from 'styled-components';

import { DividerVertical } from '../../styled-components/dividers';
import { OverlapDisabled } from '../../styled-components/overlaps';
import { ContainerOptions } from '../../styled-components/containers';

import { ContextGame } from '../../../contexts/games/floating-point-online';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 5px;
`;

const Divider = styled(DividerVertical)`
  background-color: ${(props): string => props.theme.inverted};
`;

const Overlap = styled(OverlapDisabled)`
  background-color: ${(props): string =>
    props.theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;

const OptionsCommon: React.FC = () => {
  const states = useContext(ContextGame);

  const { state } = states;

  return <Container></Container>;
};

export default React.memo(OptionsCommon);
