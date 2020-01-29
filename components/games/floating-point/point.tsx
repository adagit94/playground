import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContextParams } from '../../../contexts/games/floating-point';

const Point = ({ statesFP }): JSX.Element => {
  const statesParams = useContext(ContextParams);

  const Point = styled.div`
    position: absolute;
    top: ${statesFP.top}px;
    left: ${statesFP.left}px;
    width: ${statesParams.dimensions}px;
    height: ${statesParams.dimensions}px;
    background-color: #8b0000;
    border-radius: 100%;
  `;

  return (
    <>
      <Point />
    </>
  );
};

export default React.memo(Point);
