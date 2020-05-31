import { useContext, memo } from 'react';
import styled from 'styled-components';

import Size from './size';
import Speed from './speed';
import Buttons from './buttons';
import Switch from './switch';
import Play from './play';
import Reset from './reset';
import AddPlayer from './add-player';
import RemovePlayer from './remove-player';

import { DividerVertical } from 'components/styled-components/dividers';
import { OverlapDisabled } from 'components/styled-components/overlaps';
import { ContainerOptions } from 'components/styled-components/containers';

import { ContextGame } from 'contexts/games/floating-point-offline';

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

const OptionsCommon: React.FC = (): JSX.Element => {
  const states = useContext(ContextGame);

  const { state, players } = states;

  return (
    <Container>
      <Buttons>
        {state === 'conf' && players.includes('left') && (
          <RemovePlayer pos='left' />
        )}

        {state === 'conf' && !players.includes('left') && (
          <AddPlayer pos='left' />
        )}

        <Switch />

        {state === 'conf' && players.includes('right') && (
          <RemovePlayer pos='right' />
        )}

        {state === 'conf' && !players.includes('right') && (
          <AddPlayer pos='right' />
        )}
      </Buttons>

      <ContainerOptions>
        <Size />
        <Divider color='inverted' />
        <Speed />
        {state !== 'conf' && <Overlap />}
      </ContainerOptions>

      <Buttons>
        {state !== 'off' && (
          <>
            <Play />
            <Reset />
          </>
        )}
      </Buttons>
    </Container>
  );
};

export default memo(OptionsCommon);
