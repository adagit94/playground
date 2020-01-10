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
  const data: any = useContext(FPContext);

  const shapePlayer = data.player[id].shape;
  const colorPlayer = data.players[id].color;

  const othersSquare = data.players.shapesOthers.includes('square');
  const othersCircle = data.players.shapesOthers.includes('circle');
  const othersRhombus = data.players.shapesOthers.includes('rhombus');
  const othersEllipse = data.players.shapesOthers.includes('ellipse');

  const Label = styled.label`
    flex: 5 5 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${shapePlayer === undefined ? '#f00' : '#000000'};
  `;

  const Square = styled.div`
    opacity: ${othersSquare ? 0.2 : '1'};
    background-color: ${colorPlayer};
    border: ${shapePlayer === 'square' ? '2px solid #f00' : 'none'};
  `;

  const Circle = styled.div`
    opacity: ${othersCircle ? 0.2 : '1'};
    background-color: ${colorPlayer};
    border: ${shapePlayer === 'circle' ? '2px solid #f00' : 'none'};
    border-radius: 100%;
  `;

  const Rhombus = styled.div`
    opacity: ${othersRhombus ? 0.2 : '1'};
    background-color: ${colorPlayer};
    border: ${shapePlayer === 'rhombus' ? '2px solid #f00' : 'none'};
    transform: rotate(45deg);
  `;

  const Ellipse = styled.div`
    opacity: ${othersEllipse ? 0.2 : '1'};
    background-color: ${colorPlayer};
    border: ${shapePlayer === 'ellipse' ? '2px solid #f00' : 'none'};
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
                  data.dispatch({
                    type: 'changeShape',
                    others: 'add',
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
                  data.dispatch({
                    type: 'changeShape',
                    others: 'add',
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
                  data.dispatch({
                    type: 'changeShape',
                    others: 'add',
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
                  data.dispatch({
                    type: 'changeShape',
                    others: 'add',
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

/*
dle techto kriterii definovat patricny dispatch

state.players.shapesOthers.indexOf(shape) === -1 &&
state.players[player].shape === ''

state.players.shapesOthers.indexOf(shape) === -1 &&
state.players[player].shape !== ''
*/
