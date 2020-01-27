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

const Shape = ({ id }): JSX.Element => {
  const states = useContext(ContextParams);
  const dispatch = useContext(ContextDispatchParams);

  const unclickableSquare =
    states.shapesOthers.includes('square') && states[id].shape !== 'square';
  const unclickableCircle =
    states.shapesOthers.includes('circle') && states[id].shape !== 'circle';
  const unclickableRhombus =
    states.shapesOthers.includes('rhombus') && states[id].shape !== 'rhombus';
  const unclickableEllipse =
    states.shapesOthers.includes('ellipse') && states[id].shape !== 'ellipse';

  const Label = styled.label`
    flex: 5 5 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${states[id].shape === undefined ? '#f00' : '#000000'};
  `;

  const Square = styled.div`
    opacity: ${unclickableSquare ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'square' ? '2px solid #000000' : 'none'};
  `;

  const Circle = styled.div`
    opacity: ${unclickableCircle ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'circle' ? '2px solid #000000' : 'none'};
    border-radius: 100%;
  `;

  const Rhombus = styled.div`
    opacity: ${unclickableRhombus ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'rhombus' ? '2px solid #000000' : 'none'};
    transform: rotate(45deg);
  `;

  const Ellipse = styled.div`
    opacity: ${unclickableEllipse ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'ellipse' ? '2px solid #000000' : 'none'};
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
                      states[id].shape === '' || states[id].shape === undefined
                        ? 'add'
                        : states[id].shape === 'square'
                        ? 'remove'
                        : 'change',
                    player: id,
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
                      states[id].shape === '' || states[id].shape === undefined
                        ? 'add'
                        : states[id].shape === 'circle'
                        ? 'remove'
                        : 'change',
                    player: id,
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
                      states[id].shape === '' || states[id].shape === undefined
                        ? 'add'
                        : states[id].shape === 'rhombus'
                        ? 'remove'
                        : 'change',
                    player: id,
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
                      states[id].shape === '' || states[id].shape === undefined
                        ? 'add'
                        : states[id].shape === 'ellipse'
                        ? 'remove'
                        : 'change',
                    player: id,
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
