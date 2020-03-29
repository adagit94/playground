import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';

import { Colors } from '../../../types/layout';
import { PropsOptions } from '../../../types/games/floating-point';
import {
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
`;

const WrapperInput = styled.div`
  overflow: hidden;
  position: relative;
  height: 25px;
  width: 50px;
  border: 1px solid ${(props): string => props.theme.inverted};
`;

const Input = styled.input`
  position: absolute;
  top: -7px;
  left: -7px;
  height: 37px;
  width: 62px;
  background-color: unset;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const Color: React.FC<PropsOptions> = ({ player }) => {
  const states = useContext(ContextParams);
  const colors: Colors = useContext(ThemeContext);
  const dispatches = useContext(ContextDispatches);

  return (
    <ContainerOption>
      <label htmlFor='color'>Color:</label>
      <ContainerInput>
        <WrapperInput>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              const color = e.target.value;

              if (
                !states.colorsOthers.includes(color) &&
                colors.background !== color
              ) {
                dispatches.params({
                  type: 'changeColor',
                  color,
                  player
                });
              }
            }}
            value={states[player].color}
            type='color'
            id='color'
          />
        </WrapperInput>
      </ContainerInput>
    </ContainerOption>
  );
};

export default React.memo(Color);
