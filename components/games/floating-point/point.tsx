import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  ContextParams,
  ContextFP
} from '../../../contexts/games/floating-point';

const Point: React.FC = (): JSX.Element => {
  const statesParams = useContext(ContextParams);
  const statesFP = useContext(ContextFP);

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
