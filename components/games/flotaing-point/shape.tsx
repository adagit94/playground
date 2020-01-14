import React, { useContext } from 'react';
import styled from 'styled-components';

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

function Shape({ id }): JSX.Element {
  const states = useContext(ContextPlayers);
  const dispatch = useContext(ContextDispatchPlayers);

  const shape = states[id].shape;
  const color = states[id].color;

  const othersSquare = states.shapesOthers.includes('square');
  const othersCircle = states.shapesOthers.includes('circle');
  const othersRhombus = states.shapesOthers.includes('rhombus');
  const othersEllipse = states.shapesOthers.includes('ellipse');

  const Label = styled.label`
    flex: 5 5 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${shape === undefined ? '#f00' : '#000000'};
  `;

  const Square = styled.div`
    opacity: ${othersSquare ? 0.2 : '1'};
    background-color: ${color};
    border: ${shape === 'square' ? '2px solid #f00' : 'none'};
  `;

  const Circle = styled.div`
    opacity: ${othersCircle ? 0.2 : '1'};
    background-color: ${color};
    border: ${shape === 'circle' ? '2px solid #f00' : 'none'};
    border-radius: 100%;
  `;

  const Rhombus = styled.div`
    opacity: ${othersRhombus ? 0.2 : '1'};
    background-color: ${color};
    border: ${shape === 'rhombus' ? '2px solid #f00' : 'none'};
    transform: rotate(45deg);
  `;

  const Ellipse = styled.div`
    opacity: ${othersEllipse ? 0.2 : '1'};
    background-color: ${color};
    border: ${shape === 'ellipse' ? '2px solid #f00' : 'none'};
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
                      shape === ''
                        ? 'add'
                        : shape === 'square'
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
                      shape === ''
                        ? 'add'
                        : shape === 'circle'
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
                      shape === ''
                        ? 'add'
                        : shape === 'rhombus'
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
                      shape === ''
                        ? 'add'
                        : shape === 'ellipse'
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
}

export default React.memo(Shape);
