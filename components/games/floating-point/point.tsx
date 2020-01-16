import React, { useContext } from 'react';
import styled from 'styled-components';

function Point(): JSX.Element {
  const statesGame = useContext(ContextGame);
  const statesFp = useContext(ContextFp);

  const Point = styled.div`
    position: absolute;
    top: ${statesFp.top};
    left: ${statesFp.left};
    width: 50px;
    height: 50px;
    background-color: #8b0000;
    border-radius: 100%;
    visibility: ${statesGame.visibility};
  `;

  return (
    <>
      <Point />
    </>
  );
}

export default React.memo(Point);
