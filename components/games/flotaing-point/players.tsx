import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

function Players(): JSX.Element {
  const data: any = useContext(PlayersContext);
  const PointP1 = styled.div`
    position: absolute;
    top: ${data.players.P1.positions.top};
    left: ${data.players.P1.positions.left};
    width: ${data.dimensions}px;
    height: ${data.dimensions}px;
    background-color: ${data.players.P1.color};
    visibility: ${data.visibility};
    border-radius: ${data.players.P1.shape === 'circle' ||
    data.players.P1.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${data.players.P1.shape === 'rhombus'
      ? 'rotate(45deg)'
      : data.players.P1.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP2 = styled.div`
    position: absolute;
    top: ${data.players.P2.positions.top};
    left: ${data.players.P2.positions.left};
    width: ${data.dimensions}px;
    height: ${data.dimensions}px;
    background-color: ${data.players.P2.color};
    visibility: ${data.visibility};
    border-radius: ${data.players.P2.shape === 'circle' ||
    data.players.P2.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${data.players.P2.shape === 'rhombus'
      ? 'rotate(45deg)'
      : data.players.P2.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP3 = styled.div`
    position: absolute;
    top: ${data.players.P3.positions.top};
    left: ${data.players.P3.positions.left};
    width: ${data.dimensions}px;
    height: ${data.dimensions}px;
    background-color: ${data.players.P3.color};
    visibility: ${data.visibility};
    border-radius: ${data.players.P3.shape === 'circle' ||
    data.players.P3.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${data.players.P3.shape === 'rhombus'
      ? 'rotate(45deg)'
      : data.players.P3.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP4 = styled.div`
    position: absolute;
    top: ${data.players.P4.positions.top};
    left: ${data.players.P4.positions.left};
    width: ${data.dimensions}px;
    height: ${data.dimensions}px;
    background-color: ${data.players.P4.color};
    visibility: ${data.visibility};
    border-radius: ${data.players.P4.shape === 'circle' ||
    data.players.P4.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${data.players.P4.shape === 'rhombus'
      ? 'rotate(45deg)'
      : data.players.P4.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  useEffect(() => {
    data.matchFloatingPoint();
  });

  return (
    <>
      <PointP1 />
      <PointP2 />
      <PointP3 />
      <PointP4 />
    </>
  );
}

export default Players;
