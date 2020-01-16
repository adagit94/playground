import React, { useContext } from 'react';
import styled from 'styled-components';

import { ContextContent } from '../../../contexts/layout/content';

const Container = styled.section``;

const Content = (): JSX.Element => {
  const content = useContext(ContextContent);

  return <Container>{content}</Container>;
};

export default Content;
