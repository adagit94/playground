import React, { useContext } from 'react';
import styled from 'styled-components';

function FloatingPoint(): JSX.Element {
  const data: any = useContext(FPContext);

  const positions = data.fP;
  const visibility = data.visibility;

  const Point = styled.div`
    position: absolute;
    top: ${positions.top};
    left: ${positions.left};
    width: 50px;
    height: 50px;
    background-color: #8b0000;
    border-radius: 100%;
    visibility: ${visibility};
  `;

  return (
    <>
      <Point />
    </>
  );
}

export default React.memo(FloatingPoint);
