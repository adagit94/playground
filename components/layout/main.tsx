import React from 'react';
import styled from 'styled-components';

import { PropsLayout } from '../../types/layout';

const Container = styled.main`
  flex: auto;
`;

const Main: React.FC<PropsLayout> = ({ content }) => {
  return <Container>{content}</Container>;
};

export default Main;
