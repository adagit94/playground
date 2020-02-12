import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContextContent } from '../../../contexts/layout/content';

const Container = styled.main`
  width: 100%;
`;

const Main: React.FC = (): JSX.Element => {
  const content = useContext(ContextContent);

  return <Container>{content}</Container>;
};

export default React.memo(Main);