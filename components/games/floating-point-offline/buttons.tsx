import React from 'react';
import styled from 'styled-components';

import { PropsButtons } from '../../../types/games/floating-point-offline';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 10px;
`;

const Buttons: React.FC<PropsButtons> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default React.memo(Buttons);
