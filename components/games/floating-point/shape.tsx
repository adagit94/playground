import React, { useContext } from 'react';
import styled from 'styled-components';

import { LabelOption } from '../../styled-components/labels';
import {
  ContainerRowBetween,
  ContainerOption
} from '../../styled-components/containers';

import {
  ContextParams,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

import {
  PropsOptions,
  StatesPlayers
} from '../../../types/games/floating-point';

const ContainerIcons = styled(ContainerRowBetween)`
  flex-wrap: wrap;
  height: 100px;
  width: 100px;
`;

const Shape: React.FC<PropsOptions> = ({ player }): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const {
    shapesOthers,
    [player as keyof StatesPlayers]: { shape, color }
  } = states;

  const isDefined = typeof shape === 'string';
  const unclickableSquare =
    shapesOthers.includes('square') && shape !== 'square';
  const unclickableCircle =
    shapesOthers.includes('circle') && shape !== 'circle';
  const unclickableRhombus =
    shapesOthers.includes('rhombus') && shape !== 'rhombus';
  const unclickableEllipse =
    shapesOthers.includes('ellipse') && shape !== 'ellipse';

  const Label = styled(LabelOption)`
    color: ${shape === null && '#f00'};
  `;

  const Square = styled.div`
    width: 35px;
    height: 35px;
    opacity: ${unclickableSquare ? 0.5 : 1};
    background-color: ${color};
    border: ${shape === 'square' && '2px solid'};
    cursor: ${unclickableSquare ? 'not-allowed' : 'pointer'};
  `;

  const Circle = styled.div`
    width: 35px;
    height: 35px;
    opacity: ${unclickableCircle ? 0.5 : 1};
    background-color: ${color};
    border: ${shape === 'circle' && '2px solid'};
    border-radius: 100%;
    cursor: ${unclickableCircle ? 'not-allowed' : 'pointer'};
  `;

  const Rhombus = styled.div`
    width: 35px;
    height: 35px;
    opacity: ${unclickableRhombus ? 0.5 : 1};
    background-color: ${color};
    border: ${shape === 'rhombus' && '2px solid'};
    transform: rotate(45deg);
    cursor: ${unclickableRhombus ? 'not-allowed' : 'pointer'};
  `;

  const Ellipse = styled.div`
    width: 35px;
    height: 35px;
    opacity: ${unclickableEllipse ? 0.5 : 1};
    background-color: ${color};
    border: ${shape === 'ellipse' && '2px solid'};
    border-radius: 100%;
    transform: rotateX(45deg);
    cursor: ${unclickableEllipse ? 'not-allowed' : 'pointer'};
  `;

  return (
    <ContainerOption>
      <Label htmlFor='color'>Shape:</Label>
      <ContainerIcons>
        <Square
          onClick={
            unclickableSquare
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'square'
                      ? 'remove'
                      : 'change',
                    shape: 'square',
                    player
                  });
                }
          }
        />

        <Circle
          onClick={
            unclickableCircle
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'circle'
                      ? 'remove'
                      : 'change',
                    shape: 'circle',
                    player
                  });
                }
          }
        />

        <Rhombus
          onClick={
            unclickableRhombus
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'rhombus'
                      ? 'remove'
                      : 'change',
                    shape: 'rhombus',
                    player
                  });
                }
          }
        />

        <Ellipse
          onClick={
            unclickableEllipse
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'ellipse'
                      ? 'remove'
                      : 'change',
                    shape: 'ellipse',
                    player
                  });
                }
          }
        />
      </ContainerIcons>
    </ContainerOption>
  );
};

export default React.memo(Shape);
