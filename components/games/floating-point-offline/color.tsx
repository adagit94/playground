import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ContainerOption } from '../../styled-components/containers';
import { InputOptionsLabel } from '../../styled-components/inputs';

import { Theming } from '../../../types/layout';
import { PropsOptionsPlayer } from '../../../types/games/floating-point-offline';
import {
  ContextParams,
  ContextDispatchesFP
} from '../../../contexts/games/floating-point-offline';

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
`;

const ContainerInputField = styled.div`
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

const Color: React.FC<PropsOptionsPlayer> = ({ player }) => {
  const theming: Theming = useContext(ThemeContext);
  const states = useContext(ContextParams);
  const dispatches = useContext(ContextDispatchesFP);

  return (
    <ContainerOption>
      <InputOptionsLabel htmlFor='color'>Color:</InputOptionsLabel>
      <ContainerInput>
        <ContainerInputField>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              const color = e.target.value;

              if (
                !states.colorsOthers.includes(color) &&
                theming.background !== color
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
        </ContainerInputField>
      </ContainerInput>
    </ContainerOption>
  );
};

export default memo(Color);
