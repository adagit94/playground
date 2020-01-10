import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

function Players(): JSX.Element {
  const data: any = useContext(FPContext);

  const dimensions = data.dimensions;
  const visibility = data.visibility;
  const P1 = data.players.P1;
  const P2 = data.players.P2;
  const P3 = data.players.P3;
  const P4 = data.players.P4;

  const PointP1 = styled.div`
    position: absolute;
    top: ${P1.positions.top};
    left: ${P1.positions.left};
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: ${P1.color};
    visibility: ${visibility};
    border-radius: ${P1.shape === 'circle' || P1.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${P1.shape === 'rhombus'
      ? 'rotate(45deg)'
      : P1.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP2 = styled.div`
    position: absolute;
    top: ${P2.positions.top};
    left: ${P2.positions.left};
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: ${P2.color};
    visibility: ${visibility};
    border-radius: ${P2.shape === 'circle' || P2.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${P2.shape === 'rhombus'
      ? 'rotate(45deg)'
      : P2.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP3 = styled.div`
    position: absolute;
    top: ${P3.positions.top};
    left: ${P3.positions.left};
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: ${P3.color};
    visibility: ${visibility};
    border-radius: ${P3.shape === 'circle' || P3.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${P3.shape === 'rhombus'
      ? 'rotate(45deg)'
      : P3.shape === 'ellipse'
      ? 'rotateX(45deg)'
      : ''};
  `;

  const PointP4 = styled.div`
    position: absolute;
    top: ${P4.positions.top};
    left: ${P4.positions.left};
    width: ${dimensions}px;
    height: ${dimensions}px;
    background-color: ${P4.color};
    visibility: ${visibility};
    border-radius: ${P4.shape === 'circle' || P4.shape === 'ellipse'
      ? '100%'
      : ''};
    transform: ${P4.shape === 'rhombus'
      ? 'rotate(45deg)'
      : P4.shape === 'ellipse'
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

export default React.memo(Players);
