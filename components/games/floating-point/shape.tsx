import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextPlayers,
  ContextDispatchPlayers
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
  const states = useContext(ContextPlayers);
  const dispatch = useContext(ContextDispatchPlayers);

  const othersSquare = states.shapesOthers.includes('square');
  const othersCircle = states.shapesOthers.includes('circle');
  const othersRhombus = states.shapesOthers.includes('rhombus');
  const othersEllipse = states.shapesOthers.includes('ellipse');

  const Label = styled.label`
    flex: 5 5 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${states[id].shape === undefined ? '#f00' : '#000000'};
  `;

  const Square = styled.div`
    opacity: ${othersSquare ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'square' ? '2px solid #f00' : 'none'};
  `;

  const Circle = styled.div`
    opacity: ${othersCircle ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'circle' ? '2px solid #f00' : 'none'};
    border-radius: 100%;
  `;

  const Rhombus = styled.div`
    opacity: ${othersRhombus ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'rhombus' ? '2px solid #f00' : 'none'};
    transform: rotate(45deg);
  `;

  const Ellipse = styled.div`
    opacity: ${othersEllipse ? 0.2 : '1'};
    background-color: ${states[id].color};
    border: ${states[id].shape === 'ellipse' ? '2px solid #f00' : 'none'};
    border-radius: 100%;
    transform: rotateX(45deg);
  `;

  return (
    <Container>
      <Label htmlFor='color'>Shape:</Label>
      <Items>
        <Square
          onClick={
            othersSquare
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation:
                      states[id].shape === ''
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
            othersCircle
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation:
                      states[id].shape === ''
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
            othersRhombus
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation:
                      states[id].shape === ''
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
            othersEllipse
              ? null
              : (): void => {
                  dispatch({
                    type: 'changeShape',
                    operation:
                      states[id].shape === ''
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
