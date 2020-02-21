import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextParams,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Items = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  div {
    width: 35px;
    height: 35px;
  }
`;

const Shape = ({ player }): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const shapesOthers = states.shapesOthers;
  const shape = states[player].shape;
  const color = states[player].color;
  const isDefined = typeof shape === 'string';
  const unclickableSquare =
    shapesOthers.includes('square') && shape !== 'square';
  const unclickableCircle =
    shapesOthers.includes('circle') && shape !== 'circle';
  const unclickableRhombus =
    shapesOthers.includes('rhombus') && shape !== 'rhombus';
  const unclickableEllipse =
    shapesOthers.includes('ellipse') && shape !== 'ellipse';

  const Label = styled.label`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${shape === null && '#f00'};
  `;

  const Square = styled.div`
    opacity: ${unclickableSquare ? 0.2 : 1};
    background-color: ${color};
    border: ${shape === 'square' && '2px solid'};
    cursor: ${unclickableSquare ? 'not-allowed' : 'pointer'};
  `;

  const Circle = styled.div`
    opacity: ${unclickableCircle ? 0.2 : 1};
    background-color: ${color};
    border: ${shape === 'circle' && '2px solid'};
    border-radius: 100%;
    cursor: ${unclickableCircle ? 'not-allowed' : 'pointer'};
  `;

  const Rhombus = styled.div`
    opacity: ${unclickableRhombus ? 0.2 : 1};
    background-color: ${color};
    border: ${shape === 'rhombus' && '2px solid'};
    transform: rotate(45deg);
    cursor: ${unclickableRhombus ? 'not-allowed' : 'pointer'};
  `;

  const Ellipse = styled.div`
    opacity: ${unclickableEllipse ? 0.2 : 1};
    background-color: ${color};
    border: ${shape === 'ellipse' && '2px solid'};
    border-radius: 100%;
    transform: rotateX(45deg);
    cursor: ${unclickableEllipse ? 'not-allowed' : 'pointer'};
  `;

  return (
    <Container>
      <Label htmlFor='color'>Shape:</Label>
      <Items>
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
                    player,
                    shape: 'square'
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
                    player,
                    shape: 'circle'
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
                    player,
                    shape: 'rhombus'
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
                    player,
                    shape: 'ellipse'
                  });
                }
          }
        />
      </Items>
    </Container>
  );
};

export default React.memo(Shape);
