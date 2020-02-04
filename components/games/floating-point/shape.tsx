import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextParams,
  ContextDispatchParams
} from '../../../contexts/games/floating-point';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Items = styled.div`
  flex: 5 5 0;
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

  const unclickableSquare =
    states.shapesOthers.includes('square') && states[player].shape !== 'square';
  const unclickableCircle =
    states.shapesOthers.includes('circle') && states[player].shape !== 'circle';
  const unclickableRhombus =
    states.shapesOthers.includes('rhombus') &&
    states[player].shape !== 'rhombus';
  const unclickableEllipse =
    states.shapesOthers.includes('ellipse') &&
    states[player].shape !== 'ellipse';

  const Label = styled.label`
    flex: 5 5 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${states[player].shape === null ? '#f00' : '#000000'};
  `;

  const Square = styled.div`
    opacity: ${unclickableSquare ? 0.2 : '1'};
    background-color: ${states[player].color};
    border: ${states[player].shape === 'square' ? '2px solid #000000' : 'none'};
  `;

  const Circle = styled.div`
    opacity: ${unclickableCircle ? 0.2 : '1'};
    background-color: ${states[player].color};
    border: ${states[player].shape === 'circle' ? '2px solid #000000' : 'none'};
    border-radius: 100%;
  `;

  const Rhombus = styled.div`
    opacity: ${unclickableRhombus ? 0.2 : '1'};
    background-color: ${states[player].color};
    border: ${states[player].shape === 'rhombus'
      ? '2px solid #000000'
      : 'none'};
    transform: rotate(45deg);
  `;

  const Ellipse = styled.div`
    opacity: ${unclickableEllipse ? 0.2 : '1'};
    background-color: ${states[player].color};
    border: ${states[player].shape === 'ellipse'
      ? '2px solid #000000'
      : 'none'};
    border-radius: 100%;
    transform: rotateX(45deg);
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
                    operation:
                      states[player].shape === '' ||
                      states[player].shape === undefined
                        ? 'add'
                        : states[player].shape === 'square'
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
                    operation:
                      states[player].shape === '' ||
                      states[player].shape === undefined
                        ? 'add'
                        : states[player].shape === 'circle'
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
                    operation:
                      states[player].shape === '' ||
                      states[player].shape === undefined
                        ? 'add'
                        : states[player].shape === 'rhombus'
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
                    operation:
                      states[player].shape === '' ||
                      states[player].shape === undefined
                        ? 'add'
                        : states[player].shape === 'ellipse'
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
