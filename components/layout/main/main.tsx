import React from 'react';
import styled from 'styled-components';

import { PropsLayout } from '../../../types/games/floating-point';

const Container = styled.main`
  flex: auto;
`;

const Main: React.FC<PropsLayout> = ({ content }): JSX.Element => {
  return <Container>{content}</Container>;
};

export default React.memo(Main);
